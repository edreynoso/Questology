import type { CSSProperties } from 'react'

export function bannerStyle(url: string | undefined): CSSProperties | undefined {
    if (!url) return undefined
    return {
        backgroundImage: `linear-gradient(var(--color-tint), var(--color-tint)), url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
}
