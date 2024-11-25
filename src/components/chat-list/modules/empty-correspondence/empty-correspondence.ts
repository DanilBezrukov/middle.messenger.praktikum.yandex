import { Block } from 'core';
import emptyCorrespondence from './empty-correspondence.hbs';
import './empty-correspondence.scss';

export class EmptyCorrespondence extends Block {
    constructor() {
        super(emptyCorrespondence);
    }
}
