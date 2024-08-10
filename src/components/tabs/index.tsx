import { defaultTo } from "@/lib/helpers/safe-navigation";
import React, { useState, createContext, useContext, Children, Dispatch, SetStateAction, ReactElement } from "react";

interface TabsContextType {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

interface PropsWithChildren {
  children: ReactElement[]
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);
const TabContext = createContext<number>(0);

const Tabs = (props: PropsWithChildren) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	return (
		<TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
			<div className="w-full">{props.children}</div>
		</TabsContext.Provider>
	);
}

function TabList(props: PropsWithChildren) {
	const wrappedChildren = Children.map(props.children, (child, index) => (
		<TabContext.Provider value={index}>{child}</TabContext.Provider>
	));
	return (
		<ul className="flex list-none flex-row flex-wrap border-b-0 pl-0 gap-2" role="tablist">{wrappedChildren}</ul>
	);
}

function Tab({ children, isDisabled, ...rest }: { children: React.ReactNode; isDisabled: boolean; }) {

	const index = useContext(TabContext);
	const { activeIndex, setActiveIndex } = useContext(TabsContext) || {};
	const isActive = index === activeIndex;

	return (
    <li role="presentation">
      <a
        className={`block border-x-0 border-t-0 rounded-t border-transparent dark:bg-gray-400/50 px-7 pb-3.5 pt-4 text-xs font-medium leading-tight text-gray-500 hover:isolate hover:border-transparent hover:bg-gray-100 focus:isolate focus:border-transparent aria-selected:border-blue-500 aria-selected:text-blue-500 dark:text-white/50 dark:hover:bg-gray-500/60 dark:aria-selected:text-blue-500 ${
          isDisabled
          ? "disabled cursor-not-allowed opacity-50"
          : isActive
          ? `active border-pink-300 bg-white dark:bg-white`
          : ""    
        }`}
        role="tab"
        aria-selected="true"
        onClick={isDisabled ? undefined : () => setActiveIndex?.(index)}
        key={index + "tab"}
        {...rest}
        >
        {children}
      </a>
    </li>
	);
}

function TabPanels(props: PropsWithChildren) {
  const { activeIndex } = useContext(TabsContext) || { activeIndex: 0 };
  return <div className="mb-6">
    <div className="transition-opacity duration-150 ease-linear aria-selected:block p-4 bg-white rounded-b"
      role="tabpanel"
    >
      {props.children[activeIndex]}
    </div>
  </div>
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return children;
}

interface ComposedTabsProps {
  data: {
    label: string
    content: React.ReactNode
    disabled?: boolean
  }[]
}

function ComposedTabs(props: ComposedTabsProps) {
	return (
		<Tabs>
			<TabList>
				{props.data.map((tab, i) => (
					<Tab isDisabled={defaultTo(tab.disabled, false)} key={`tw-tab-${i}`}>
						{tab.label}
					</Tab>
				))}
			</TabList>
			<TabPanels>
				{props.data.map((tab, i) => (
					<TabPanel key={`tw-tabp-${i}`}>
						{tab.content}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}

export {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	ComposedTabs,
};