import { useState } from 'react';

const tabs = { CODE: 'CODE_TAB', SETTINGS: 'SETTINGS_TAB' };

function useTabs() {
    const [currentTab, setCurrentTab] = useState(tabs.CODE);

    const setCodeTab = () => setCurrentTab(tabs.CODE);

    const setSettingsTab = () => setCurrentTab(tabs.SETTINGS);

    return { currentTab, tabs, setCodeTab, setSettingsTab };
}

export default useTabs;
