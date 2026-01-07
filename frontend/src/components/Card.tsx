import { Notebook, Trash2Icon, LinkIcon, CopyCheckIcon, EllipsisVerticalIcon, XIcon, ExternalLinkIcon } from "lucide-react"
import { Tweet } from "react-tweet"
import { ContentType } from "../utils/constants"
import { YoutubePlayer } from "./YoutubePlayer"
import { copyToClipboard, getXId, slugify } from "../utils/utils"
import { useState } from "react"

interface CardProps {
  title: string
  content: string
  type: ContentType
  tags?: string[] | string
  link?: string
  createdAt: string
  onDelete?: () => void
}

export function Card(props: CardProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!props?.content) return
    copyToClipboard(props.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col w-full max-w-[320px] bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 p-4 transition-all duration-300 relative group">
      
      {open && (
        <div 
          className="fixed inset-0 z-10 cursor-default" 
          onClick={() => setOpen(false)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center text-gray-500">
          <Notebook size={14} className="text-indigo-500" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400">{props.type}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-all"
            title="Copy Content"
          >
            {!copied ? <LinkIcon size={16} /> : <CopyCheckIcon className="text-green-500" size={16} />}
          </button>

          <div className="relative z-20">
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 cursor-pointer rounded-full transition-all ${open ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 text-gray-400'}`}
            >
              {open ? <XIcon size={16} /> : <EllipsisVerticalIcon size={16} />}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in duration-150 origin-top-right">
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">Actions</div>
                
                <button 
                   className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                   onClick={() => { window.open(props.content, '_blank'); setOpen(false); }}
                >
                  <ExternalLinkIcon size={14} /> View Source
                </button>

                <div className="h-[1px] bg-gray-100 my-1" />

                {/* Editing the brain */}
                 <button 
                   className="flex cursor-pointer font-bold items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                   onClick={() => setOpen(false)}
                >
                  <ExternalLinkIcon size={14} /> Edit Brain
                </button>


                <button 
                  className="cursor-pointer font-bold flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-red-50 transition-colors"
                  onClick={() => { props.onDelete?.(); setOpen(false); }}
                >
                  <Trash2Icon size={14} /> Delete Brain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 h-10">
        {props.title}
      </h2>

      {/* Main Content Area */}
      <div className="flex flex-col gap-2 min-h-[120px] justify-center bg-gray-50/50 rounded-xl p-1">
        {props.type === ContentType.YOUTUBE && (
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm">
            <YoutubePlayer videoUrl={props.content} />
          </div>
        )}

        {props.type === ContentType.X && (
          <div className="max-h-[220px] overflow-y-auto no-scrollbar rounded-lg p-1 bg-white border border-gray-100">
            <div className="light scale-90 origin-top transform">
              <Tweet id={getXId(props.content)} />
            </div>
          </div>
        )}

        {props.type === ContentType.PDF && (
          <div className="relative group/pdf">
            <iframe
              className="w-full h-[200px] rounded-lg border border-gray-200"
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(props.content)}&embedded=true`}
            />
          </div>
        )}

        {props.type === ContentType.GENERAL && (
          <p className="text-xs text-gray-600 p-3 leading-relaxed italic">
            "{props.content}"
          </p>
        )}
      </div>

      {/* Tags Section */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {props.tags && (Array.isArray(props.tags) ? props.tags : [props.tags]).map((tag, i) => (
          <span
            key={i}
            className="text-[9px] bg-white border border-indigo-100 text-indigo-500 px-2 py-0.5 rounded-md font-semibold hover:bg-indigo-500 hover:text-white transition-colors cursor-default"
          >
            #{slugify(String(tag))}
          </span>
        ))}
      </div>

      {/* Footer Date */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
        <span className="text-gray-500  text-[9px] font-bold flex items-center gap-1">
          Added {props.createdAt}
        </span>
      </div>
    </div>
  )
}