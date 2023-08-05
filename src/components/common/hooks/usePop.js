import { useCallback } from "react"

export const usePop = () => {
    const displayPopClickHandler = useCallback((isOpening, ref, switchDisplayHandler) => {
        let leftPercent = isOpening ? -100 : 0
        const endPercent = leftPercent ? 0 : -100
        const step = leftPercent ? -10 : 10

        if (isOpening)
            switchDisplayHandler()

        const transition = setInterval(() => {
            if (ref.current) {
                leftPercent -= step
                ref.current.style.left = leftPercent + '%'

                if (leftPercent === endPercent) {
                    clearInterval(transition)
                    if (!isOpening)
                        switchDisplayHandler()
                }
            }
        }, 30)
    }, [])

    return {
        displayPopClickHandler
    }
}