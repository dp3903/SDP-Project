import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


export const keywords = {
    AMETHYST : "AMETHYST",
    SWIFTUI : "SWIFTUI",
    OPENMP : "OPENMP",
    UI_UX : "UI_UX",
    KTOR : "KTOR",
    ML_NET : "ML_NET",
    NOSQL : "NOSQL",
    IOT : "IOT",
    AI : "AI",
    ANGULAR : "ANGULAR",
    GAME_DEVELOPMENT : "GAME_DEVELOPMENT",
    BACKEND : "BACKEND",
    UNITY : "UNITY",
    ROCKET : "ROCKET",
    SQLITE : "SQLITE",
    NUXT_JS : "NUXT_JS",
    JAKARTA_EE : "JAKARTA_EE",
    MACHINE_LEARNING : "MACHINE_LEARNING",
    APACHE_HADOOP : "APACHE_HADOOP",
    COCOS2D_X : "COCOS2D_X",
    FLASK : "FLASK",
    UNREAL_ENGINE : "UNREAL_ENGINE",
    WINFORMS : "WINFORMS",
    MONGODB : "MONGODB",
    SPRING_BOOT : "SPRING_BOOT",
    GO : "GO",
    CLOUD_MICROSERVICES : "CLOUD_MICROSERVICES",
    OPERATING_SYSTEM : "OPERATING_SYSTEM",
    DEVOPS : "DEVOPS",
    DATA_SCIENCE : "DATA_SCIENCE",
    BLOCKCHAIN : "BLOCKCHAIN",
    SCENEKIT : "SCENEKIT",
    CLOUD_COMPUTING : "CLOUD_COMPUTING",
    PYGAME : "PYGAME",
    PYTORCH : "PYTORCH",
    ALGORITHMS : "ALGORITHMS",
    CPP : "CPP",
    MYSQL : "MYSQL",
    KIVY : "KIVY",
    GIN : "GIN",
    EXPRESS_JS : "EXPRESS_JS",
    WXWIDGETS : "WXWIDGETS",
    DJANGO : "DJANGO",
    VAPOR : "VAPOR",
    POSTGRESQL : "POSTGRESQL",
    CYBERSECURITY : "CYBERSECURITY",
    SFML : "SFML",
    DESKTOP_APPLICATIONS : "DESKTOP_APPLICATIONS",
    MLPACK : "MLPACK",
    FASTAPI : "FASTAPI",
    COBRA : "COBRA",
    BEVY : "BEVY",
    CUDA : "CUDA",
    FRONTEND : "FRONTEND",
    SEABORN : "SEABORN",
    SVELTE : "SVELTE",
    PYTHON : "PYTHON",
    TENSORFLOW_CPP : "TENSORFLOW_CPP",
    GRPC : "GRPC",
    NUMPY : "NUMPY",
    THREE_JS : "THREE_JS",
    JETPACK_COMPOSE : "JETPACK_COMPOSE",
    FULL_STACK : "FULL_STACK",
    JMONKEYENGINE : "JMONKEYENGINE",
    NATURAL_LANGUAGE_PROCESSING : "NATURAL_LANGUAGE_PROCESSING",
    DATA_STRUCTURES : "DATA_STRUCTURES",
    SPRITEKIT : "SPRITEKIT",
    FIREBASE : "FIREBASE",
    SQL : "SQL",
    MOBILE_DEVELOPMENT : "MOBILE_DEVELOPMENT",
    CLI_DEVELOPMENT : "CLI_DEVELOPMENT",
    GUI_DEVELOPMENT : "GUI_DEVELOPMENT",
    LIBGDX : "LIBGDX",
    ACTIX : "ACTIX",
    PANDAS : "PANDAS",
    KUBERNETES : "KUBERNETES",
    ECHO : "ECHO",
    WEB_DEVELOPMENT : "WEB_DEVELOPMENT",
    EMBEDDED_SYSTEMS : "EMBEDDED_SYSTEMS",
    CSHARP : "CSHARP",
    JAVASCRIPT : "JAVASCRIPT",
    QT : "QT",
    APACHE_SPARK : "APACHE_SPARK",
    MATPLOTLIB : "MATPLOTLIB",
    REACT : "REACT",
    PHASER_JS : "PHASER_JS",
    WPF : "WPF",
    UIKIT : "UIKIT",
    HIGH_PERFORMANCE_COMPUTING : "HIGH_PERFORMANCE_COMPUTING",
    NESTJS : "NESTJS",
    REDIS : "REDIS",
    BIG_DATA : "BIG_DATA",
    SWIFT : "SWIFT",
    DATABASES : "DATABASES",
    IOS_DEVELOPMENT : "IOS_DEVELOPMENT",
    MACHINE_LEARNING_2 : "MACHINE_LEARNING_2",
    VUE_JS : "VUE_JS",
    RUST : "RUST",
    KOTLIN : "KOTLIN",
    COMPUTER_VISION : "COMPUTER_VISION",
    KOA : "KOA",
    PYGLET : "PYGLET",
    JAVA : "JAVA",
    NEXT_JS : "NEXT_JS",
    SPRING_BOOT_KOTLIN : "SPRING_BOOT_KOTLIN",
    ASP_NET_CORE : "ASP_NET_CORE",
    TENSORFLOW : "TENSORFLOW",
    FIBER : "FIBER",
    NETWORK : "NETWORK",
    ANDROID_SDK : "ANDROID_SDK",
    SCIKIT_LEARN : "SCIKIT_LEARN",
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