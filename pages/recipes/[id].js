import Layout from '../../components/layout';
import { getAllRecipeIds, getRecipeData } from '../../lib/recipes';

export default function Recipe({ recipeData }) {
  return (
    <Layout>
      {recipeData.title}
      <br />
      {recipeData.id}
      <br />
      {recipeData.date}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllRecipeIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const recipeData = getRecipeData(params.id);
  return {
    props: {
      recipeData,
    },
  };
}