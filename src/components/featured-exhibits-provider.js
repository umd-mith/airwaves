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
            key_image
          }
          fileAbsolutePath
          id
        }
      }
      dataJson {
        featured_by_title
      }
    }
  `)

  const filterExhibits = data => {
    const allExhibits = data.allMarkdownRemark.nodes
    const featuredTitles = data.dataJson.featured_by_title

    return allExhibits.filter(item =>
      featuredTitles.includes(item.frontmatter.title)
    )
  }

  const reshapeExhibitData = exhibitObj => {
    let keyImagePath = exhibitObj.frontmatter.key_image

    return {
      absPath: exhibitObj.fileAbsolutePath,
      title: exhibitObj.frontmatter.title,
      creator: exhibitObj.frontmatter.creator,
      lede: exhibitObj.frontmatter.lede,
      keyImage: keyImagePath,
      id: exhibitObj.id,
    }
  }

  const featured = filterExhibits(exhibitsData)
  const featuredAsProps = featured.map(e => {
    return reshapeExhibitData(e)
  })

  return (
    <div className="featured-exhibits-container">
      {featuredAsProps.map(cardProps => (
        <ExhibitSummaryCard
          key={cardProps.id}
          title={cardProps.title}
          creator={cardProps.creator}
          keyImage={cardProps.keyImage}
          lede={cardProps.lede}
          absPath={cardProps.absPath}
        />
      ))}
    </div>
  )
}

export default FeaturedExhibitsProvider
