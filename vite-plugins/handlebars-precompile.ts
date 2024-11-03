import type { PluginOption } from 'vite';
import Handlebars from 'handlebars';

export function handlebarsPrecompile(): PluginOption {
    const fileRegexp = /\.hbs$| \.handlebars$/;
    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src: string, id: string) {
            if (!fileRegexp.test(id)) {
                return;
            }
            // language=javascript
            const code = `
                import Handlebars from 'handlebars/runtime';
                export default Handlebars.template(${Handlebars.precompile(src)});
            `;

            return {
                code,
            };
        },
    };
}
