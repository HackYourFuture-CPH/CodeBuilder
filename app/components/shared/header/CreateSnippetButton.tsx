import { useSession } from 'next-auth/client'
import Link from 'next/link'
import styles from './CreateSnippetButton.css'

export default function CreateSnippetButton() {
  const [ session, loading ] = useSession()

  if (loading) return null

  return session ? (
    <Link href="/components/snippets/Create">
      <a className={styles.button}>
        <span className={styles.text}>Create Snippet</span>
      </a>
    </Link>
  ) : null
}
