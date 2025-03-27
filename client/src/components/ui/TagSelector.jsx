import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


export const keywords = {
  PYTHON : "PYTHON",
  ANGULAR : "ANGULAR",
  SEABORN : "SEABORN",
  RUST : "RUST",
  COMPUTER_VISION : "COMPUTER_VISION",
  PYGAME : "PYGAME",
  NUMPY : "NUMPY",
  CLOUD_COMPUTING : "CLOUD_COMPUTING",
  UNITY : "UNITY",
  ALGORITHMS : "ALGORITHMS",
  UNREAL_ENGINE : "UNREAL_ENGINE",
  GO : "GO",
  SVELTE : "SVELTE",
  JAVASCRIPT : "JAVASCRIPT",
  FRONTEND : "FRONTEND",
  QT : "QT",
  GUI_DEVELOPMENT : "GUI_DEVELOPMENT",
  DATA_SCIENCE : "DATA_SCIENCE",
  POSTGRESQL : "POSTGRESQL",
  NESTJS : "NESTJS",
  MYSQL : "MYSQL",
  SPRITEKIT : "SPRITEKIT",
  SCENEKIT : "SCENEKIT",
  DESKTOP_APPLICATIONS : "DESKTOP_APPLICATIONS",
  AI : "AI",
  BIG_DATA : "BIG_DATA",
  ASP_NET_CORE : "ASP_NET_CORE",
  COCOS2D_X : "COCOS2D_X",
  KTOR : "KTOR",
  SQL : "SQL",
  IOS_DEVELOPMENT : "IOS_DEVELOPMENT",
  APACHE_HADOOP : "APACHE_HADOOP",
  PYTORCH : "PYTORCH",
  GAME_DEVELOPMENT : "GAME_DEVELOPMENT",
  NEXT_JS : "NEXT_JS",
  SWIFTUI : "SWIFTUI",
  NOSQL : "NOSQL",
  FIREBASE : "FIREBASE",
  JAKARTA_EE : "JAKARTA_EE",
  FIBER : "FIBER",
  MONGODB : "MONGODB",
  BLOCKCHAIN : "BLOCKCHAIN",
  REDIS : "REDIS",
  TENSORFLOW : "TENSORFLOW",
  WINFORMS : "WINFORMS",
  SWIFT : "SWIFT",
  KIVY : "KIVY",
  REACT : "REACT",
  FULL_STACK : "FULL_STACK",
  GRPC : "GRPC",
  DATABASES : "DATABASES",
  SCIKIT_LEARN : "SCIKIT_LEARN",
  OPERATING_SYSTEM : "OPERATING_SYSTEM",
  APACHE_SPARK : "APACHE_SPARK",
  EMBEDDED_SYSTEMS : "EMBEDDED_SYSTEMS",
  PANDAS : "PANDAS",
  UI_UX : "UI_UX",
  WPF : "WPF",
  KUBERNETES : "KUBERNETES",
  JAVA : "JAVA",
  NATURAL_LANGUAGE_PROCESSING : "NATURAL_LANGUAGE_PROCESSING",
  SPRING_BOOT : "SPRING_BOOT",
  MACHINE_LEARNING : "MACHINE_LEARNING",
  GIN : "GIN",
  LIBGDX : "LIBGDX",
  JETPACK_COMPOSE : "JETPACK_COMPOSE",
  DEVOPS : "DEVOPS",
  C : "C",
  MOBILE_DEVELOPMENT : "MOBILE_DEVELOPMENT",
  THREE_JS : "THREE_JS",
  UIKIT : "UIKIT",
  ML_NET : "ML_NET",
  CYBERSECURITY : "CYBERSECURITY",
  IOT : "IOT",
  FLASK : "FLASK",
  KOA : "KOA",
  ROCKET : "ROCKET",
  NETWORK : "NETWORK",
  BACKEND : "BACKEND",
  VUE_JS : "VUE_JS",
  FASTAPI : "FASTAPI",
  WEB_DEVELOPMENT : "WEB_DEVELOPMENT",
  CUDA : "CUDA",
  DJANGO : "DJANGO",
  HIGH_PERFORMANCE_COMPUTING : "HIGH_PERFORMANCE_COMPUTING",
  SQLITE : "SQLITE",
  DATA_STRUCTURES : "DATA_STRUCTURES",
  KOTLIN : "KOTLIN",
  NUXT_JS : "NUXT_JS",
  EXPRESS_JS : "EXPRESS_JS",
  MATPLOTLIB : "MATPLOTLIB",
  VAPOR : "VAPOR",
  SFML : "SFML"
}

export function TagSelector({
  tags = Object.keys(keywords),
  selectedTags = [],
  onChange,
  placeholder = "Type to filter tags...",
  className,
  disabled = false,
}) {
  const [inputValue, setInputValue] = React.useState("")
  const [selected, setSelected] = React.useState(selectedTags)

  const handleUnselect = (tag) => {
    const newSelected = selected.filter((s) => s !== tag)
    setSelected(newSelected)
    onChange?.(newSelected)
  }

  const handleSelect = (tag) => {
    if (selected.includes(tag)) return
    const newSelected = [...selected, tag]
    setSelected(newSelected)
    onChange?.(newSelected)
    setInputValue("")
  }

  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()))

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-1 mb-2 rounded-md p-2 border-2 border-gray-300">
        {selected.length > 0 ? (
          selected.map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-1 mb-1">
              {keywords[tag]}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (!disabled) handleUnselect(tag)
                }}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-sm">No tags selected</span>
        )}
      </div>

      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
        className="border-2 border-gray-300"
      />

      <ScrollArea className="h-[120px] rounded-md border-2 border-gray-300">
        <div className="p-2">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                size="sm"
                className={cn("justify-start w-full text-left mb-1", selected.includes(tag) && "bg-muted")}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSelect(tag)
                }}
                disabled={disabled}
              >
                {keywords[tag]}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground p-2">No tags found</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}