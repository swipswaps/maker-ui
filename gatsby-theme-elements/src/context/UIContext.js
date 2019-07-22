import React, { useState, useContext } from "react"
import themeOptions from "../utils/defaults"

const UIContext = React.createContext()

const UIContextProvider = ({ children }) => {
  const [state, setState] = useState({
    options: themeOptions,
    menuActive: false,
    sideNavActive: true,
  })
  const value = React.useMemo(() => {
    return { state, setState }
  }, [state])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// Usage Hooks

function useOptions() {
  const { state } = useContext(UIContext)
  if (state.options === undefined) {
    throw new Error("useOptions must be used within a UIContextProvider")
  }
  return state.options
}

function useMenu() {
  const { state, setState } = useContext(UIContext)
  const menuActive = state.menuActive

  function toggleMenu() {
    setState(state => ({
      ...state,
      menuActive: !state.menuActive,
    }))
  }

  return [menuActive, toggleMenu]
}

function useSideNav() {
  const { state, setState } = useContext(UIContext)
  const sideNavActive = state.sideNavActive

  function toggleSideNav() {
    setState(state => ({
      ...state,
      sideNavActive: !state.sideNavActive,
    }))
  }

  return [sideNavActive, toggleSideNav]
}

export { UIContextProvider, useOptions, useMenu, useSideNav }
