import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// API调用函数
const fetchRandomWikiQA = async () => {
  try {
    const response = await axios.get(
      'https://apis.tianapi.com/baiketiku/index',
      {
        params: {
          key: 'd23ec9d352ae41edd8f7c796bb3983ed'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching random wiki QA:', error)
    return null
  }
}

// 转换API数据格式
const transformWikiQA = data => {
  if (data && data.code === 200) {
    return {
      heading: data.result.title,
      message: data.result.title
    }
  }
  return null
}

export function EmptyScreen({ submitMessage, className }) {
  const [exampleMessages, setExampleMessages] = useState([])

  useEffect(() => {
    async function loadRandomWikiQA() {
      const wikiQAData = await fetchRandomWikiQA()
      const transformedData = transformWikiQA(wikiQAData)
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
