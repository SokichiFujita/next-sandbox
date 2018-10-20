import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

const handleRoute = () => {
  Router.push({ pathname: '/document', query: { key1: 'queryStringValue1'}})
}

const TopPage = (json) => {
  return (
    <div>
      <div style={{
        height:'100vh', 
        width:'100vw',
        backgroundSize: 'cover',
        backgroundImage: 'url(/static/hero.png)'
      }}/>
      <h1>Next.js sandbox</h1>
      <h3>Fetched data from an API</h3>
      <div> { json.stargazers_count } GitHub stars </div>

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
