import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

<<<<<<< HEAD
interface WikiQAItem {
  typeid: number
  title: string
  content: string
}

interface WikiQAResponse {
  code: number
  msg: string
  result: {
    list: WikiQAItem[]
  }
}

const fetchRandomWikiQA = async (): Promise<WikiQAResponse | null> => {
  try {
    const response = await axios.get('https://apis.tianapi.com/tenwhy/index', {
      params: {
        key: 'd23ec9d352ae41edd8f7c796bb3983ed'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching random wiki QA:', error)
    return null
  }
}

// 转换API数据格式
const transformWikiQA = (data: WikiQAResponse) => {
  if (data && data.code === 200 && data.result.list.length > 0) {
    const item = data.result.list[0]
    return {
      heading: item.title,
      message: item.title
    }
=======
const exampleMessages = [
  {
    heading: 'What is GPT-4o mini?',
    message: 'What is GPT-4o mini?'
  },
  {
    heading: 'Why is Nvidia growing rapidly?',
    message: 'Why is Nvidia growing rapidly?'
  },
  {
    heading: 'How does the Vercel AI SDK work?',
    message: 'How does the Vercel AI SDK work?'
  },
  {
    heading: 'Tesla vs Rivian',
    message: 'Tesla vs Rivian'
>>>>>>> 219786d51409b29f4338dd034bb21751dd6c12e2
  }
  return null
}

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  const [exampleMessages, setExampleMessages] = useState<
    { heading: string; message: string }[]
  >([])

  useEffect(() => {
    async function loadRandomWikiQA() {
      const wikiQAData = await fetchRandomWikiQA()
      const transformedData = transformWikiQA(wikiQAData!)
      if (transformedData) {
        setExampleMessages([transformedData])
      }
    }
    loadRandomWikiQA()
  }, [])

  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
