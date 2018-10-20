import fetch from 'isomorphic-unfetch'

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
      <div> { json.stargazers_count } GitHub stars </div>
    </div>
  )
}

TopPage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json();
  console.log(json);
  return json
}

export default TopPage
