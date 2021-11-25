import MotionWrapper from "../../../../UI/Motion/MotionWrapper";
import {pageTransitionVariants} from "../../../../UI/Motion/Variants/Variants";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {screenWidth} from "../../../../UI/screenSizes";
import {ProfileData} from "../../../../../store/appState/appStateReducer";
import Profile from "../Profile/Profile";
import {FormattedMessage} from "react-intl";

type ManageProfileProps = {
    custom: number,
    profile: ProfileData,
    onUpdate: (profile: ProfileData) => void
}

const StyledManageProfile = styled.div`
  padding: 40px 0;
  background-color: ${props => props.theme.ui.colors.background.elevationOne};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.ui.colors.text.primary};
  @media (${screenWidth.mediumWidth}) {
    margin: 20px;
  }
`

const StyledManageProfileRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`

const StyledManageProfileSaveButton = styled.button`
  min-width: 15rem;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${props => props.theme.ui.colors.primary};
  color: white;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.ui.colors.border.light};
  font-size: ${props => props.theme.ui.fontSizes.narrow.sm};
  font-weight: bold;
  text-transform: capitalize;

  &:disabled {
    opacity: 0.6;
  }
`


const ManageProfile = ({custom, profile, onUpdate}: ManageProfileProps) => {

    useEffect(() => {
        if (profile) {
            setCurrentProfile(profile)
        }
    }, [])

    const [currentProfile, setCurrentProfile] = useState<ProfileData>({
        keyid: '',
        primary: false
    })

    const onSave = () => {
        if (currentProfile) {
            onUpdate(currentProfile)
        }
    }

    const getProfileViewData = () => {
        const profileViewData = {
            ...profile
        }
        if (profile.imageSrc !== currentProfile.imageSrc) {
            profileViewData.imageSrc = currentProfile.imageSrc
        }
        return profileViewData
    }

    const saveIsDisabled = () => {
        return (profile?.nickname === currentProfile?.nickname) && (profile?.imageSrc === currentProfile?.imageSrc) && ((profile?.primary === currentProfile?.primary))
    }

    return (
        <MotionWrapper runInitialAnimation={true} custom={custom} name="Manage Profile"
                       variants={pageTransitionVariants}>
            <StyledManageProfile>
                <Profile profile={getProfileViewData()} onChange={(profile) => setCurrentProfile(profile)}/>
                <StyledManageProfileRow>
                    <StyledManageProfileSaveButton
                        disabled={saveIsDisabled()}
                        onClick={onSave}
                    >
                        <FormattedMessage id='platform.manageProfile.saveButton'/>
                    </StyledManageProfileSaveButton>
                </StyledManageProfileRow>
            </StyledManageProfile>
        </MotionWrapper>
    )
}

export default ManageProfile
