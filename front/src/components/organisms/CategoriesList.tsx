import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Spinner } from '../atoms'
import icons from '../../assets/icons'
import { urls } from '../../constants'

const ImgStyled = styled.img`
  height: 30px;
  margin-right: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.lg};
`

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

const LinkCategory = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`

const CategoriesContainerStyled = styled(FlexBox)`
  padding-left: ${dimensions.spacing.xxs};
  margin-right: ${dimensions.spacing.sm};
  align-items: flex-start;
  color: ${colors.gray.gray3};
  min-width: 10rem;
`
type TLinkStyled = {
  active?: boolean
}
const CategoryStyled = styled.span<TLinkStyled>`
  color: ${({ active }) => (active ? colors.black.black3 : colors.gray.gray3)};
  font-size: ${font.xs};
  font-weight: 600;
  font-family: ${font.fontFamily};
  margin-top: ${dimensions.spacing.lg};
  cursor: pointer;

  :hover {
    color: ${({ active }) => (active ? colors.black.black3 : colors.primary)};
  }

  &::before {
    content: '${({ active }) => (active ? '●' : '')}';
    font-size: larger;
    color: ${colors.primary};
    margin-right: 0.3rem;
  }
`

// TODO: Remove once we receive img property from the API
const categoryImg: Record<string, string> = {
  Angular: icons.angular,
  'Data Science': icons.dataScience,
  Java: icons.java, // TODO: Add Java Icon
  Javascript: icons.javascript, // TODO: Add Javascript Icon
  Node: icons.node, // TODO: Add Node Icon
  PHP: icons.php, // TODO: Add PHP Icon
  Python: icons.python, // TODO: Add Python Icon
  React: icons.react, // TODO: Add React Icon
  Spring: icons.spring, // TODO: Add Spring Icon
}

type TCategory = {
  id: string
  img: string
  name: string
  resources: number
  slug: string
  topics: number
}

const getCategories = () =>
  fetch(urls.getCategories)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching categories: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching categories: ${err.message}`)
    })

export const CategoriesList: FC = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { isLoading, data, error } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  })

  const { slug } = useParams()

  if (isLoading) return <SpinnerStyled size="medium" role="status" />
  if (error) return <p>Ha habido un error...</p>
  return (
    <div>
      <CategoriesContainerStyled>
        {data?.map((category: TCategory) => (
          <LinkCategory
            to={`/category/${category.slug}`}
            state={{ name: category.name, id: category.id }}
            key={category.id}
            data-testid={category.name}
          >
            <FlexBox direction="row">
              <ImgStyled
                src={categoryImg[category.name]}
                alt={`${category.name} logo`}
              />
              <CategoryStyled active={slug === category.slug}>
                {category.name}
              </CategoryStyled>
            </FlexBox>
          </LinkCategory>
        ))}
      </CategoriesContainerStyled>
    </div>
  )
}
