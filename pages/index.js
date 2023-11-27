import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { getSortedRecipesData } from '../lib/recipes';

export async function getStaticProps() {
  const allRecipesData = getSortedRecipesData();
  return {
    props: {
      allRecipesData,
    }
  };
}

export default function Home({ allRecipesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Making you the best dinner party chef.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recipes</h2>
        <ul className={utilStyles.list}>
          {allRecipesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`recipes/${encodeURIComponent(id)}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
          </ul>
      </section>
    </Layout>
  );
}