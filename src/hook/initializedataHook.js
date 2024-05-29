import {useContext, useEffect} from "react";
import {GameLogicContext} from "../context/GameLogicProvider.jsx";

export function useInitializedataHook() {
    const {
        start,
        setStart,
        reset
    } = useContext(GameLogicContext);
    useEffect(() => {
        if (start) {
            reset();
        }
        return () => {
            setStart(false);
        }
    }, [start]);
}