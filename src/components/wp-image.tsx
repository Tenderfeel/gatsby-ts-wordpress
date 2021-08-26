/**
 * WPから取得した画像をGatsbyImageで表示する
 * RDFa対応
 */
import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

type WpImageProps = {
  image?: GatsbyTypes.WpNodeWithFeaturedImageToMediaItemConnectionEdge
  style?: React.CSSProperties
}

const WpImage = ({ image, style }: WpImageProps): JSX.Element | null => {
  const data = image?.node?.localFile?.childImageSharp?.gatsbyImageData
  const alt = image?.node?.altText || ''

  if (!image || !data) {
    return null
  }

  return <GatsbyImage image={data} alt={alt} style={style} property='image' />
}

export default WpImage
