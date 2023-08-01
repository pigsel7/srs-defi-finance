import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as HeaderDevider } from "../../assets/svg/metoshi-underline.svg";
import { StakeItem} from "../../components/StakeItem/Stake-item";



const StyledHeader = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 96px;
    font-family: "Quantum Latin W03 Bold";
    line-height: 115px;
    letter-spacing: 0.02em;
    color: #fff;
    text-align: center;
    @media (max-width: 640px) {
        font-size: 70px;
        line-height: 80px;
    }
    @media (max-width: 450px) {
        font-size: 50px;
        line-height: 56px;
    }
`;

const StyledVelocityx = styled.span`
    color: #ff0035;
`;

const StyledArrowBack = styled.p`
  color: #fff;
  display: flex;
  align-items: center;
`;


const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 87.5px;
`;

const StyledStakeItemContainer = styled.div`
  margin-top: 62px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 32px;
  align-items: flex-start;
`;

const StyledHeaderDevider = styled(HeaderDevider)`
  @media (max-width: 875px) {
    display: none;
  } 
`;

export const Finance = ({
    onUseConnection,
    account,
    onStake,
    onWindraw,
    onStakeV2,
    onStakeV3,
    needToApprove,
    update,
    provider
}) => {
    const { t } = useTranslation();
    
    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ])

    const handleWindraw = useCallback(() => {
      onWindraw();
 }, [ onWindraw ])

     const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])

    const handleStake2 = useCallback(() => {
        onStakeV2();
    }, [ onStakeV2 ])
    const handleStake3 = useCallback(() => {
        onStakeV3();
    }, [ onStakeV3 ])

    return (
        <div>
            <StyledHeaderContainer>
                    <StyledHeader>
                        <StyledVelocityx>SRS</StyledVelocityx> DeFi{" "}
                    </StyledHeader>
                    {/* <StyledHeaderDevider /> */}
            </StyledHeaderContainer>
            <StyledStakeItemContainer>
                <StakeItem
                    key="1"
                    version="1"
                    earnedText="$TURBO"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake}
                    onWindraw={handleWindraw}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
                <StakeItem
                    key="2"
                    version="2"
                    earnedText="$TURBO"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake2}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
                <StakeItem
                    key="3"
                    version="3"
                    earnedText="USDT"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake3}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
            </StyledStakeItemContainer>
        </div>
    );
};
