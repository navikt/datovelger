/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

export interface ContainerBlurEvent {
    source: 'esc' | 'blur';
}

export function contains(node: HTMLElement, child: Element) {
    return node === child || node.contains(child);
}

export interface Props {
    onKeyDown?: (evt: React.KeyboardEvent<HTMLDivElement>) => void;
    onBlur?: (evt: React.FocusEvent<HTMLDivElement> | { source: string }) => void;
    onFocus?: (evt: React.FocusEvent<HTMLDivElement>) => void;
    active?: boolean;
    className?: string;
    tabIndex?: number;
    children: React.ReactNode;
}

const DomEventContainer = (props: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const { active, onBlur, onKeyDown, onFocus, className, tabIndex, children } = props;

    const [isActive, setIsActive] = useState<boolean>(active === true);

    useEffect(() => {
        const blur = (source: string) => {
            if (onBlur) {
                onBlur({
                    source,
                });
            }
        };
        const handleDocumentKeyDown = (evt?: any) => {
            if (evt && evt.keyCode === 27) {
                blur('esc');
            }
        };
        const startEventListening = () => {
            window.addEventListener('keydown', handleDocumentKeyDown);
        };

        const stopEventListening = () => {
            window.removeEventListener('keydown', handleDocumentKeyDown);
        };
        if (active !== isActive) {
            if (active === true) {
                startEventListening();
                setIsActive(true);
            } else {
                stopEventListening();
                setIsActive(false);
            }
        }
    }, [active, setIsActive, isActive, onBlur]);

    const handleOnBlur = () => {
        const divContainer = divRef.current || null;
        if (divContainer === null) {
            return;
        }
        setTimeout(() => {
            const activeElement = window.document.activeElement;
            const isChildElement = activeElement ? contains(divContainer, activeElement) : undefined;
            if (!isChildElement && onBlur) {
                onBlur({ source: 'blur' });
            }
        }, 0);
    };

    const handleOnInternalDocumentKeyDown = (evt: KeyboardEvent<any>) => {
        if (onKeyDown) {
            onKeyDown(evt);
        }
    };

    return (
        <div
            ref={divRef}
            onBlur={handleOnBlur}
            onKeyDown={handleOnInternalDocumentKeyDown}
            onFocus={onFocus}
            className={className}
            tabIndex={tabIndex}>
            {children}
        </div>
    );
};
export default DomEventContainer;
