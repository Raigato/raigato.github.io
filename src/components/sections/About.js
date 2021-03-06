import React, { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import Img from "gatsby-image"

import { skillSplit } from "@utils"
import sr from "@utils/sr"
import { srConfig, github } from "@config"
import { theme, mixins, media, Section, Heading } from "@styles"
const { colors, fontSizes, fonts } = theme

library.add(fab)

const StyledContainer = styled(Section)`
  position: relative;
`
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`
const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  font-size: ${fontSizes.md};
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  font-family: ${fonts.main};
  font-size: ${fontSizes.lg};
  color: ${colors.slate};
`
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 350px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`
const StyledAvatar = styled(Img)`
  position: relative;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background: transparent;
  margin-left: -20px;
  &:hover,
  &:focus {
    &:after {
      top: 15px;
      left: 15px;
    }
  }
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.background};
    mix-blend-mode: screen;
  }
  &:after {
    border: 2px solid ${colors.primary};
    top: 20px;
    left: 20px;
    z-index: -1;
  }
`

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node
  const { title, skills, avatar } = frontmatter
  const revealContainer = useRef(null)
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), [])

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledFlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <SkillsContainer>
            {skills &&
              skills.map((skill, i) => {
                const { icon, name } = skillSplit(skill)
                return (
                  <Skill key={i}>
                    <FontAwesomeIcon icon={["fab", icon]} /> {name}
                  </Skill>
                )
              })}
          </SkillsContainer>
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href={github}>
            <StyledAvatar
              fluid={avatar.childImageSharp.fluid}
              alt="Gabriel RAYMONDOU"
            />
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
    </StyledContainer>
  )
}

export default About
