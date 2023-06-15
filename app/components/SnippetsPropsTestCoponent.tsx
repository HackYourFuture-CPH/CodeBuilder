"use client"
import useSWR from 'swr'
import SnippetCardComponent from './SnippetCardComponent'

function SnippetsPropsTestCoponent() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR('/api/snippets', fetcher)
//  console.log(data)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (<>
    {data.map((snippet)=>(<SnippetCardComponent key={snippet._id} 
    title ={snippet.title} 
    description={snippet.description} 
    favorite={snippet.favorite}
    tags={snippet.tags}
    code={snippet.code}
    created_at={snippet.created_at}
    updated_at={snippet.updated_at}
    author_id={snippet.author_id}
    />))}
  </>)
}

export default SnippetsPropsTestCoponent;