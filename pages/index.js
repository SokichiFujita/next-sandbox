import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import dynamic from 'next/dynamic'

const DynamicImageAreaWithCustomLoading = dynamic(() => import('../components/ImageArea'), {
  loading: () => <p>CUSTOM LOADING...</p>
})

const handleRoute = () => {
  Router.push({ pathname: '/document', query: { key1: 'queryStringValue1'}})
}

const font = "Indie Flower"


const TopPage = (json) => {
  return (
    <div>
      <Head>
        <title>Next.js Sandbox</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href={`https://fonts.googleapis.com/css?family=${font.replace(' ', '+')}`} rel="stylesheet" />
      </Head>
      <style jsx global>
      {`
        body {
          margin: 0;
          font-family: '${font}', sans-serif;
        }
      `}
      </style>

      <div style={{
        height:'100vh', 
        width:'100vw',
        backgroundSize: 'cover',
        backgroundImage: 'url(/static/hero.png)'
      }}/>

      <div style={{margin: 16}}>
        <h1>Next.js sandbox</h1>

        <h2>Initial Fetch</h2>

        <h3>Fetched data from an API</h3>
        <div> { json.stargazers_count } GitHub stars </div>

        <h2>Routing</h2>

        <h3>Link for internal url</h3>
        <Link href="/document">
          <a>/document</a>
        </Link>

        <h3>Link for internal url with a div</h3>
        <Link href={json.html_url}>
          <div>https://github.com/zeit/next.js</div>
        </Link>

        <h3>Link for internal url with query strings</h3>
        <Link href={{ pathname: '/document', query: { key1: 'queryStringValue1', key2: 'queryStringValue2' } }}>
          <a>/document with query string</a>
        </Link>

        <h3>Router for internal url with query strings</h3>
        <div onClick={handleRoute}>/document with query string by Router component</div>

        <h3>Link for extenral url</h3>
        <Link href={json.html_url}>
          <a>https://github.com/zeit/next.js</a>
        </Link>

        <h3>just an "a href" tag</h3>
        <a href="https://github.com/zeit/next.js">https://github.com/zeit/next.js</a>

        <h2>Dynamic Import</h2>
        <h3>Dynamic loading with custom component</h3>
        <DynamicImageAreaWithCustomLoading style={{width:100, height:100, borderRadius:50}} />
      </div>
    </div>
  )
}

TopPage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json();
  console.log(json);
  console.log(json.stargazers_count);
  console.log(json.url);
  return json
}

export default TopPage
