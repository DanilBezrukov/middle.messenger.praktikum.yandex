import { v4 as makeId } from 'uuid';
import { EventBus } from '../event-bus/event-bus';
import { TChildren, IProps, IMeta, IRunningListeners } from './types';
import { compileHbs } from '../core';
import { TAttributes } from '../utils/types';
import { EVENT } from './events';
import { TCallback } from '../event-bus/types';
import { deepEqual } from '../../utils/deepEqual';

export abstract class Block<P extends IProps = IProps> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    } as const;

    private _element: HTMLElement | undefined;
    protected _id: string;
    protected _meta: IMeta;
    private _runningListeners: IRunningListeners[] = [];
    protected props: P;
    protected children: TChildren<unknown>;
    protected lists: Record<string, TChildren<unknown>>;
    protected eventBus: () => EventBus;
    private _setUpdate = false;
    protected tmpl;
    /** JSDoc
     * @param {unknown} wrapper
     * @param {IProps} property
     */
    protected constructor(wrapper: unknown, property: IProps = {}) {
        this.tmpl = wrapper;
        const { tagName } = compileHbs(wrapper);
        const { children, props, lists } = this._getChildren(property);
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        this._id = makeId();

        this.children = this._makePropsProxy(children);
        this.lists = this._makePropsProxy(lists);
        this.props = this._makePropsProxy({ ...props, _id: this._id });

        this._meta = { tagName, props };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as TCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    public _componentDidShowed() {
        this.componentDidShowed();
    }

    public componentDidShowed() {}

    public init() {}

    private _render() {
        if (!this._element) return;
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.setAttributesWrapper(this._meta?.attributes);
        this.addEvents();
    }

    setAttributesWrapper(attributes?: TAttributes) {
        if (!attributes) return;
        for (const attrName in attributes) {
            try {
                this._element?.setAttribute(attrName, attributes[attrName]);
            } catch (e) {
                console.error(e);
            }
        }
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
        if (this.props.settings?.withInternalID) {
            this.element?.setAttribute('data-id', this._id);
        }
    }

    protected componentDidMount(): void {}

    protected dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: IProps, newProps: IProps) {
        let deepPropComparison = this.props.settings?.deepPropComparison;
        deepPropComparison ??= true;
        return !deepEqual(oldProps, newProps, deepPropComparison);
    }

    getIdList(list: unknown, key: string) {
        if (Array.isArray(list) && list[0] instanceof Block) {
            return (list as Block[]).reduce((acc, cur) => {
                acc += cur._id;
                return acc;
            }, '');
        }
        return key;
    }

    protected compile(template = this.tmpl) {
        const propsAndStubs: IProps = { ...this.props };
        Object.entries(this.children).forEach(([key, child]) => {
            if (child instanceof Block) {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
        });

        Object.entries(this.lists).forEach(([key, child]) => {
            const idList = this.getIdList(child, key);
            propsAndStubs[key] = `<div data-id="${idList}"></div>`;
        });

        const fragment = this._createDocumentElement<HTMLTemplateElement>('template');

        const { body, attributes } = compileHbs(template, propsAndStubs);
        this._meta.attributes = attributes;
        fragment.innerHTML = body;

        Object.values(this.children).forEach(child => {
            if (child instanceof Block) {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            }
        });
        Object.entries(this.lists).forEach(([key, child]) => {
            const idList = this.getIdList(child, key);
            const stub = fragment.content.querySelector(`[data-id="${idList}"]`);
            if (!stub) {
                return;
            }
            const listContent = this._createDocumentElement<HTMLTemplateElement>('template');
            if (Array.isArray(child)) {
                child.forEach(item => {
                    if (item instanceof Block) {
                        listContent.content.append(item.getContent());
                    } else {
                        listContent.content.append(`${item}`);
                    }
                });
                stub.replaceWith(listContent.content);
            }
        });

        return fragment.content;
    }

    private _getChildren(property: IProps): { children: TChildren<Block>; props: IProps; lists: Record<string, TChildren<Block>> } {
        const children: TChildren<Block> = {};
        const props: IProps = {};
        const lists: Record<string, TChildren<Block>> = {};
        Object.entries(property).forEach(([key, value]: [string | number, unknown]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                if (value[0] instanceof Block) {
                    lists[key] = property[key] as TChildren<Block>;
                } else {
                    props[key] = property[key];
                }
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    public setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }
        this._setUpdate = false;
        const oldValue = { ...this.props };
        const { children, props } = this._getChildren(nextProps);
        if (Object.keys(children).length) {
            Object.assign(this.children, children);
        }
        if (Object.keys(props).length) {
            Object.assign(this.props, props);
        }

        if (this._setUpdate) {
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
            this._setUpdate = false;
        }
    };

    protected get element() {
        return this._element;
    }

    protected removeEvents() {
        this._runningListeners.forEach(({ eventName, callback }) => {
            this.element?.removeEventListener(eventName, callback);
        });
        this._runningListeners.length = 0;
    }

    protected addRunningListeners(eventName: string, callback: (event: Event) => void) {
        this._runningListeners.push({ eventName, callback });
    }

    protected addEvents() {
        const { events } = this.props;
        for (const eventName in events) {
            const eventHandler = events[eventName as EVENT];
            if (eventHandler) {
                this.addRunningListeners(eventName, eventHandler);
                this.element?.addEventListener(eventName, eventHandler);
            }
        }
    }

    protected render(): DocumentFragment {
        return this.compile();
    }

    public getContent() {
        return this._element as HTMLElement;
    }

    private _makePropsProxy<T>(props: IProps): T {
        const handler: ProxyHandler<IProps> = {
            get: (target: IProps, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: IProps, prop: string, value: unknown) => {
                if (target[prop] !== value) {
                    target[prop] = value;
                    this._setUpdate = true;
                }
                return true;
            },
            deleteProperty: () => {
                return false;
            },
        };

        return new Proxy(props, handler) as T;
    }

    private _createDocumentElement<T extends HTMLElement>(tagName: string): T {
        return document.createElement(tagName) as T;
    }

    public show(view: string = 'block') {
        if (this.element) {
            this.element.style.display = view;
        }
    }

    public hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }
}
