import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './CreateSnippetButton.module.css'

export default function CreateSnippetButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return session ? (
    <Link href="/components/snippets/Create">
      <a className={styles.button}>
        <span className={styles.text}>Create Snippet</span>
      </a>
    </Link>
  ) : null
}
