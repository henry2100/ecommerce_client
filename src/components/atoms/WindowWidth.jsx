import { useState, useEffect, useLayoutEffect, useRef } from 'react';

const useWindowSize = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    // const ref = useRef(null)

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // useLayoutEffect(() => {
    //     setWidth(ref.current.offsetWidth)
    //     setHeight(ref.current.offsetHeight)
    // }, [])

    const windowWidth = windowSize[0]
    const windowHeight = windowSize[1]

    return {windowWidth, windowHeight, width, height}
}

export default useWindowSize