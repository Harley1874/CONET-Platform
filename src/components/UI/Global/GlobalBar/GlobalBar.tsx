import styled from 'styled-components';
import ProfileImage from '../../Common/Profile/Image/Image'
import {Grid3X3, Plug, SettingGear, Update} from "../../Icons/Icons";
import {screenWidth, sizes} from "../../screenSizes";
import {LogoIcon} from "../../Logo/Logo";
import ProfileDropdown from "../../Dropdowns/ProfileDropdown/ProfileDropdown";
import useAppState from "../../../../store/appState/useAppState";
import {TippyDropdown} from "../../Tippy/Tippy";
import AppsDropdown from "../../Dropdowns/AppsDropdown/AppsDropdown";
import {useState} from "react";

const StyledGlobalBar = styled.div`
  height: calc(50px + env(safe-area-inset-top));
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.ui.colors.border.light};
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.ui.colors.background.foundation};
  padding: calc(env(safe-area-inset-top)) 10px 0 10px;

  @media (${screenWidth.mediumWidth}) {
    padding: calc(env(safe-area-inset-top)) 20px 0 20px;
  }
`

const StyledBarSection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  content: '';
`

const StyledBarSectionFullWidth = styled(StyledBarSection)`
  width: 100%;
`

const StyledBarSectionOptional = styled.div`
  display: none;
  @media (${screenWidth.mediumWidth}) {
    display: flex;
    align-items: center;
  }
`

const StyledGlobalButton = styled.button`
  height: 42px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  margin: 10px 0;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${props => props.theme.ui.colors.hover};
  }
`

const StyledGlobalItem = styled(StyledGlobalButton)`
`

type Dropdowns = 'applications' | 'profiles' | null

const GlobalBar = () => {
    const {
        hasUpdateAvailable,
        setIsDrawerOpen,
        isDrawerOpen,
        windowInnerSize: {width},
        activeProfile,
        setIsModalOpen,
    } = useAppState()

    const [currentDropdown, setCurrentDropdown] = useState<Dropdowns>(null)

    const setDropdownToggle = (dropdown: Dropdowns) => {
        if (currentDropdown === dropdown) {
            return setCurrentDropdown(null)
        }
        return setCurrentDropdown(dropdown)
    }

    const closeDropdown = () => {
        setCurrentDropdown(null)
    }


    return (
        <StyledGlobalBar>
            <StyledBarSectionFullWidth>
                <StyledGlobalButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} disabled={width >= sizes.medium}>
                    <LogoIcon size={24}/>
                </StyledGlobalButton>
            </StyledBarSectionFullWidth>
            <StyledBarSectionFullWidth/>
            <StyledBarSection>
                <StyledGlobalButton>
                    <Plug size={18}/>
                </StyledGlobalButton>

                <StyledBarSectionOptional>
                    <StyledGlobalButton onClick={() => {
                        setCurrentDropdown(null)
                        setIsModalOpen('settings')
                    }}>
                        <SettingGear size={18}/>
                    </StyledGlobalButton>


                    <TippyDropdown
                        content={<AppsDropdown closeDropdown={closeDropdown}/>}
                        verticalOffset={2}
                        visible={currentDropdown === 'applications'}
                        onClickOutside={closeDropdown}
                    >
                        <StyledGlobalItem onClick={() => setDropdownToggle('applications')}>
                            <Grid3X3 size={18}/>
                        </StyledGlobalItem>
                    </TippyDropdown>

                </StyledBarSectionOptional>


                <TippyDropdown
                    content={<ProfileDropdown closeDropdown={closeDropdown}/>}
                    verticalOffset={2}
                    visible={currentDropdown === 'profiles'}
                    onClickOutside={closeDropdown}
                >
                    <StyledGlobalItem onClick={() => setDropdownToggle('profiles')}>
                        <ProfileImage src={activeProfile?.imageSrc} size='sm'/>
                    </StyledGlobalItem>
                </TippyDropdown>


                {
                    hasUpdateAvailable && (
                        <StyledGlobalButton onClick={() => {
                        }}>
                            <Update size='sm'/>
                        </StyledGlobalButton>
                    )
                }
            </StyledBarSection>
        </StyledGlobalBar>
    )
}

export default GlobalBar
