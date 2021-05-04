import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ExhibitSummaryCard from "./exhibit-summary"

const FeaturedExhibitsProvider = () => {
  const exhibitsData = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: frontmatter___title, order: ASC }) {
        nodes {
          frontmatter {
            title
            lede
            creator
            visuals {
              image {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
              title
            }
          }
          fileAbsolutePath
        }
      }
      exhibitsJson {
        exhibits_by_title
      }
    }
  `)

  const filterExhibits = data => {
    const allExhibits = data.allMarkdownRemark.nodes
    const featuredTitles = data.exhibitsJson.exhibits_by_title

    return allExhibits.filter(item =>
      featuredTitles.includes(item.frontmatter.title)
    )
  }

  const reshapeExhibitData = exhibitObj => {
    let allImages = exhibitObj.frontmatter.visuals
    let keyImage = {}
    if (allImages && allImages.length > 0) {
      keyImage = {
        image: allImages[0].image,
        title: allImages[0].title,
      }
    }
    return {
      absPath: exhibitObj.fileAbsolutePath,
      title: exhibitObj.frontmatter.title,
      lede: exhibitObj.frontmatter.lede,
      keyImage: keyImage,
    }
  }

  const featured = filterExhibits(exhibitsData)
  const featuredAsProps = featured.map(e => {
    return reshapeExhibitData(e)
  })

  return (
    <>
      {featuredAsProps.map(cardProps => (
        <ExhibitSummaryCard
          title={cardProps.title}
          keyImage={cardProps.keyImage}
          lede={cardProps.lede}
          absPath={cardProps.absPath}
        />
      ))}
    </>
  )
}

export default FeaturedExhibitsProvider
