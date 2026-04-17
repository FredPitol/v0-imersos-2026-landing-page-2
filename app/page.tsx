"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Flame, 
  Heart, 
  Users, 
  Target, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  MessageCircle, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Crown,
  Gem,
  Star,
  BookOpen,
  HandHeart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Componente para criar o efeito de Fade In ao scrollar
function FadeInSection({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target) // Anima apenas a primeira vez que aparece
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    })

    const current = domRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
} 

// Componente do Header / Navegação
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BRASAO-p4HmzUtmUTpqQe0xNy8FIKttyBxocr.png" 
            alt="Imersos Logo" 
            className="h-10 md:h-12 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#missao" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">A Missão</a>
          <a href="#historia" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Nossa História</a>
          <a href="#equipe" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Equipe</a>
          <a href="#valores" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Valores</a>
        </nav>
        <Button asChild size="sm" className="rounded-full px-6">
          <a href="#inscricao">Inscrever-se</a>
        </Button>
      </div>
    </header>
  )
}

// Hero Carousel Component
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "IMERSOS 2026",
      subtitle: "O Despertar de Uma Geração",
      description: "Novembro de 2026 • Horário a definir",
      accent: "bg-primary"
    },
    {
      title: "COMO SURGIU?",
      subtitle: "Manifesto de Propósito",
      description: "Uma visão que nasceu no coração de Deus para essa geração",
      accent: "bg-accent"
    },
    {
      title: "EDIÇÕES ANTERIORES",
      subtitle: "Veja o que Deus fez",
      description: "Mais de 2.000 vidas impactadas em duas edições",
      accent: "bg-primary"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-deep-purple/20" />
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Hero Content */}
        <FadeInSection className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BRASAO-p4HmzUtmUTpqQe0xNy8FIKttyBxocr.png"
              alt="IMERSOS 2026 - A Missão - O Despertar de Uma Geração"
              className="w-64 md:w-80 lg:w-96 h-auto"
            />
          </div>
        </FadeInSection>

        {/* Carousel Cards */}
        <FadeInSection delay={200} className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className={`${slide.accent} border-0 overflow-hidden`}>
                      <CardContent className="p-8 md:p-12 text-center">
                        <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
                          {slide.title}
                        </h3>
                        <p className="text-xl md:text-2xl font-medium text-primary-foreground/90 mb-4">
                          {slide.subtitle}
                        </p>
                        <p className="text-primary-foreground/80">
                          {slide.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const journeyItems = [
    { icon: Flame, text: "Com encontro que transforma" },
    { icon: Heart, text: "Processo que molda" },
    { icon: Users, text: "Chamado que se multiplica" },
    { icon: Crown, text: "E legado que permanece" }
  ]

  return (
    <section id="missao" className="py-24 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <FadeInSection><h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-foreground tracking-wide">
          IMERSOS 2026 — A MISSÃO: O DESPERTAR DE UMA GERAÇÃO
        </h2></FadeInSection>
        
        {/* Main CTA Button */}
        <FadeInSection delay={150} className="text-center mb-12">
          <Button 
            asChild
            size="lg" 
            className="text-lg md:text-xl px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-lg shadow-primary/30"
          >
            <a href="#">QUERO PARTICIPAR DA MISSÃO</a>
          </Button>
        </FadeInSection>

        <FadeInSection delay={300} className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Mais do que um evento, a Imersos 2026 é um convite! Não apenas para viver algo com Deus, 
            mas para viver para Deus. Tudo começou com um chamado. Agora é hora da nossa Missão.
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Na edição de 2026, somos conduzidos a um novo nível de conexão com a Palavra. 
            Depois de sermos alcançados, tratados e formados nos processos, chega o tempo de responder ao chamado. 
            Em novembro de 2026, damos um novo passo na jornada com Deus. 
            Depois de sermos alcançados, tratados e formados, chega o momento de viver aquilo que Ele já gerou em nós.
          </p>
          
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
            <strong>Afinal… O que fazemos com tudo o que recebemos de Deus?</strong>
          </p>
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium mt-4">
            Inspirados na vida do apóstolo Paulo,
            entendemos que o encontro com Cristo não é o fim — é o começo de uma vida com propósito.
            Uma geração está sendo despertada para viver além de si, amar com verdade e carregar o Evangelho com ousadia.
          </p>        </FadeInSection>

        {/* Journey Section */}
        <div className="mt-16">
          <FadeInSection><h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
            VOCÊ SERÁ CONDUZIDO A UMA JORNADA
          </h3></FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {journeyItems.map((item, index) => (
              <FadeInSection key={index} delay={index * 150}>
                <Card className="bg-card/50 border-border/50 backdrop-blur h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* Closing text and CTA */}
        <FadeInSection delay={200} className="mt-16 text-center space-y-8">
          <p className="text-xl md:text-2xl text-foreground font-semibold max-w-3xl mx-auto">
            &quot;Se você foi verdadeiramente alcançado, sabe que não pode mais viver da mesma forma.&quot;
          </p>
          
          <Button 
            asChild
            size="lg" 
            className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-lg shadow-primary/30"
          >
            <a href="#">QUERO PARTICIPAR DA MISSÃO</a>
          </Button>
        </FadeInSection>
      </div>
    </section>
  )
}

// Previous Editions Section
function PreviousEditionsSection() {
  const stats = [
    { number: "2.000+", label: "Vidas impactadas" },
    { number: "∞", label: "Histórias transformadas" },
    { number: "✦", label: "Chamados despertados" }
  ]

  return (
    <section id="edicoes" className="py-24 bg-card/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <FadeInSection><h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Veja o que Deus já fez…
        </h2></FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          {stats.map((stat, index) => (
            <FadeInSection key={index} delay={index * 200} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </FadeInSection>
          ))}
        </div>
        
        <FadeInSection delay={600}>
          <p className="text-2xl md:text-3xl font-semibold text-center mt-12 text-foreground">
            E isso é só o começo.
          </p>
          
          <div className="text-center mt-8">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-lg font-medium"
            >
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

// How It Started Section
function HowItStartedSection() {
  return (
    <section id="historia" className="py-24 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeInSection className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Uma visão que nasceu em Deus
            </h2>
          </FadeInSection>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <FadeInSection delay={100}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                A Conferência Imersos nasceu no coração de Letícia Oliveira e Mikeias Radis, 
                após uma experiência profunda com Deus. Nesse momento, o Espírito Santo revelou 
                a ela uma visão completa — tema, estrutura e propósito.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Com temor e obediência, Letícia compartilhou essa direção com outros irmãos 
                que carregam o mesmo amor pelo Reino. E ali houve confirmação: Deus testificou 
                em cada coração, e a visão passou a ser construída em unidade.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={300}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Com mais de 10 anos dedicados à liderança de adolescentes, Letícia, ao lado de 
                seu marido e da equipe, já vinha sendo preparada para esse chamado. Sua atuação 
                também se estende à coordenação da UNADCAR (União de Adolescentes do Campo de Carapina), 
                fortalecendo o despertar espiritual desta geração.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={400}>
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                Hoje, a Conferência Imersos é sustentada por uma diretoria alinhada à missão de 
                formar uma geração teen e jovem mergulhada em Deus, vivendo o chamado com ousadia 
                e rendição total.
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

// Team Section
function TeamSection() {
  const teamMembers = [
    { role: "Fundadora e Líder", name: "Letícia Oliveira", icon: Crown },
    { role: "Líder", name: "Luis Adriano", icon: Star },
    { role: "Financeiro", name: "Mikeias Radis", icon: Gem },
    { role: "Secretária", name: "Lavínia Silva", icon: BookOpen }
  ]

  const coordinators = [
    "Adilson Alves", "Antônio Cruz", "Guilherme Oliveira", 
    "Sara Paes", "Silas de Jesus", "Valtércio Almeida"
  ]

  const regents = ["Amanda Paes", "John Kennedy", "Thaynara Queiroz", "Leidy Augusto"]
  
  const media = ["Cassielen Oliveira", "Emily Nascimento", "Izabelly Souza", "Jhamilly Oliveira"]

  return (
    <section id="equipe" className="py-24 bg-card/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <FadeInSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Unidos em um só propósito
          </h2>
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <a href="#">Conheça nosso Exército de Deus</a>
          </Button>
        </FadeInSection>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <FadeInSection key={index} delay={index * 150}>
              <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <member.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                  <h4 className="text-lg font-semibold text-foreground">{member.name}</h4>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        {/* Other Teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FadeInSection delay={100} className="h-full">
            <Card className="bg-card border-border/50 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h4 className="text-lg font-semibold">Coordenadores</h4>
                </div>
                <ul className="space-y-2">
                  {coordinators.map((name, index) => (
                    <li key={index} className="text-muted-foreground">{name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={200} className="h-full">
            <Card className="bg-card border-border/50 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h4 className="text-lg font-semibold">Regentes</h4>
                </div>
                <ul className="space-y-2">
                  {regents.map((name, index) => (
                    <li key={index} className="text-muted-foreground">{name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={300} className="h-full">
            <Card className="bg-card border-border/50 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                  <h4 className="text-lg font-semibold">Mídia</h4>
                </div>
                <ul className="space-y-2">
                  {media.map((name, index) => (
                    <li key={index} className="text-muted-foreground">{name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        {/* CTAs */}
        <FadeInSection delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
    
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8"
          >
            <a href="#">QUERO ME INSCREVER</a>
          </Button>
        </FadeInSection>
      </div>
    </section>
  )
}

// Mission Vision Values Section
function MissionVisionValuesSection() {
  const visionPoints = [
    "Buscar a direção do Espírito Santo em cada decisão, detalhe e programação",
    "Tornar-se uma conferência referência no Brasil em avivamento teen e jovem",
    "Alcançar adolescentes e jovens com um encontro real e transformador com Deus",
    "Ganhar e orientar uma geração que frutifique e permaneça",
    "Expandir o alcance da conferência como sinal de colheita e avanço"
  ]

  const values = [
    {
      title: "Presença acima de tudo",
      description: "Sem a presença de Deus, nada faz sentido. Dependemos totalmente dEle.",
      icon: Flame
    },
    {
      title: "Intencionalidade que transforma",
      description: "Nada é aleatório. Cada detalhe gera impacto e transformação.",
      icon: Target
    },
    {
      title: "Unidade e serviço com amor",
      description: "Somos um só corpo. Servimos com alegria e respeito.",
      icon: Heart
    },
    {
      title: "Excelência com propósito",
      description: "Damos o nosso melhor porque Deus merece tudo.",
      icon: Crown
    },
    {
      title: "Coração por adolescentes e jovens",
      description: "Cada vida importa. Nosso olhar é para quem precisa ser amado e direcionado.",
      icon: HandHeart
    },
    {
      title: "Frutos que permanecem",
      description: "Mais do que momentos, buscamos transformação duradoura.",
      icon: Sparkles
    }
  ]

  return (
    <section id="valores" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Mission - Large Card */}
          <FadeInSection delay={100} className="h-full">
            <Card className="h-full bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Missão</h3>
                </div>
                <p className="text-lg text-foreground leading-relaxed flex-1">
                  Uma geração teen e jovem imersa na Palavra de Deus, mergulhando 
                  nesse chamado com ousadia e rendição total.
                </p>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Vision */}
          <FadeInSection delay={200} className="lg:col-span-2 h-full">
            <Card className="h-full bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-accent/20">
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent">Visão</h3>
                </div>
                <ul className="space-y-3">
                  {visionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Values Header */}
          <FadeInSection delay={300} className="lg:col-span-3 h-full">
            <Card className="h-full relative overflow-hidden border-primary/40 bg-gradient-to-r from-primary/10 via-card to-card hover:border-primary/60 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 md:gap-6 relative z-10 h-full">
                <div className="p-4 rounded-2xl bg-background shadow-lg shadow-primary/20 border border-primary/20">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Nossos Valores
                  </h3>
                  <p className="text-muted-foreground mt-1 font-medium">
                    Os princípios inegociáveis que nos guiam
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {values.map((value, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const [currentImage, setCurrentImage] = useState(0)

  const carouselImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselImages.length])

  return (
    <section id="resultados" className="py-24 bg-gradient-to-b from-card/50 to-background overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 text-center mb-16">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Mais de <span className="text-primary">2.000</span> pessoas já disseram sim
          </h2>
        </FadeInSection>
        <FadeInSection delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Entre 2024 e 2025, mais de 2.000 participantes fizeram história junto com a gente. 
            Vidas foram impactadas. Chamados foram despertados. Histórias foram transformadas.
          </p>
        </FadeInSection>
      </div>

      {/* Image Carousel */}
      <FadeInSection delay={400} className="w-full max-w-6xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[21/9] shadow-2xl shadow-primary/20 bg-muted">
          <div 
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {carouselImages.map((src, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img 
                  src={src} 
                  alt={`Imersos Edições Anteriores ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Gradiente escuro no fundo da foto para dar contraste aos indicadores */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentImage === index 
                    ? 'bg-primary w-8' 
                    : 'bg-white/50 hover:bg-white/80 w-2.5'
                }`}
                aria-label={`Ir para a foto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section id="inscricao" className="py-32 relative overflow-hidden scroll-mt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeInSection className="max-w-3xl mx-auto text-center">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 text-balance">
              Se você foi alcançado, você já sabe a resposta.
            </h2>
            
            <Button 
              asChild
              size="lg" 
              className="text-xl md:text-2xl px-12 py-8 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-2xl shadow-primary/40 transition-all hover:scale-105"
            >
              <a href="#">Garantir minha inscrição</a>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BRASAO-p4HmzUtmUTpqQe0xNy8FIKttyBxocr.png" 
              alt="IMERSOS 2026" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/confimersos/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only sm:not-sr-only">@confimersos</span>
            </a>
            
            <a 
              href="https://wa.me/5527997766544" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="sr-only sm:not-sr-only">(27) 99776-6544</span>
            </a>
            
            <a 
              href="mailto:imersos@confimersos.com.br"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only sm:not-sr-only">imersos@confimersos.com.br</span>
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Conferência Imersos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function ImersosLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <PreviousEditionsSection />
      <HowItStartedSection />
      <TeamSection />
      <MissionVisionValuesSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
