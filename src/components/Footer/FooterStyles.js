import styled from "styled-components"

export const FooterWrapper = styled.section`
	width: calc(100vw - 96px);
  max-width: 1040px;
  padding: 2rem 48px 40px;
  margin: 1rem auto;
  box-sizing: content-box;
  border-top: 1px solid rgba(255, 255, 255, 0.1);


  @media ${props => props.theme.breakpoints.sm} {
    padding: 2rem 16px 48px;
    width: calc(100vw - 32px);
  }
`

export const SocialIconsContainer = styled.div`
max-width: 1040px;
display: flex;
justify-content: center;

@media ${props => props.theme.breakpoints.md}{
  display: flex;
  justify-content: center;
}

@media ${props => props.theme.breakpoints.sm}{
  display: flex;
	width: 100%;
  flex-direction: column;
}
`

export const CompanyContainer = styled.div`
  display: flex;
	align-items: baseline;
	flex-wrap: wrap;
	justify-content: center;

	@media ${props => props.theme.breakpoints.md}{
		flex-direction: column;
		align-items: center;
	}

	@media ${props => props.theme.breakpoints.sm}{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`


export const Slogan = styled.p`
	color: rgba(255, 255, 255, 0.5);
	min-width: 280px;
	letter-spacing: 0.02em;
	font-size: 18px;
	line-height: 30px;
	padding-top: 1rem;

	@media ${props => props.theme.breakpoints.md}{
		font-size: 17px;
		line-height: 28px;
	}

	@media ${props => props.theme.breakpoints.sm}{
		line-height: 22px;
		font-size: 15px;
		min-width: 100px;
	}
`
