import React, {useState, useCallback} from 'react';
import {useNetworkStatus} from './hooks/useNetworkStatus';

const SetupSplash = ({onSetup}) => {
    const {isOnline} = useNetworkStatus();
    const [isSettingUp, setIsSettingUp] = useState(false);

    const onClick = useCallback((evt) => {
        setIsSettingUp(true);
        onSetup();
        evt.preventDefault();
    }, [isSettingUp]);
    
    return (
        <div>
            <h1>First: Connect the audio cable</h1>
            <h1>Second: Put your phone into airplane mode</h1>
            {isSettingUp ? (
                <span>code</span>
            ) : (
                <span>
                    {isOnline ? (
                        <span>Please go offline.</span>
                    ) : (
                        <button onClick={onClick}>
                            Connect
                        </button>
                    )}
                </span>
            )}
        </div>
    );
};

export default SetupSplash;