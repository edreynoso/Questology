import type { CSSProperties } from 'react'

/**
 * `fade` swaps the flat tint for one that darkens toward the bottom,
 * for banners whose text sits at the bottom edge.
 */
export function bannerStyle(url: string | undefined, fade = false): CSSProperties | undefined {
    if (!url) return undefined
    const tint = fade
        ? 'linear-gradient(180deg, var(--color-tint-light) 0%, var(--color-tint-strong) 100%)'
        : 'linear-gradient(var(--color-tint), var(--color-tint))'
    return {
        backgroundImage: `${tint}, url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
}
