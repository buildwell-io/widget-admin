import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from './icons';

function registerIconsFactory(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): () => void {
    return () => {
        ICONS.forEach(({ namespace, name, url }) => {
            iconRegistry.addSvgIconInNamespace(namespace, name, sanitizer.bypassSecurityTrustResourceUrl(url));
        });
    };
}

export function provideIcons(): Provider {
    return {
        provide: APP_INITIALIZER,
        useFactory: registerIconsFactory,
        deps: [ MatIconRegistry, DomSanitizer ],
        multi: true,
    };
}
