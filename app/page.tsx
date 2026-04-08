"use client"

import { useState, useEffect } from "react"
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-deep-purple/20" />
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Conferência Jovem Cristã</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">IMERSOS</span>
            <span className="block text-primary">2026</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            O Despertar de Uma Geração
          </p>
        </div>

        {/* Carousel Cards */}
        <div className="relative max-w-5xl mx-auto">
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
        </div>
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Badge/Button */}
        <div className="text-center mb-12">
          <Button 
            asChild
            size="lg" 
            className="text-lg md:text-xl px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-lg shadow-primary/30"
          >
            <a href="#">IMERSOS 2026 — A MISSÃO: O DESPERTAR DE UMA GERAÇÃO</a>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
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
            Afinal… O que fazemos com tudo o que recebemos de Deus? Inspirados na vida do apóstolo Paulo, 
            entendemos que o encontro com Cristo não é o fim — é o começo de uma vida com propósito. 
            Uma geração está sendo despertada para viver além de si, amar com verdade e carregar o Evangelho com ousadia.
          </p>
        </div>

        {/* Journey Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
            VOCÊ SERÁ CONDUZIDO A UMA JORNADA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {journeyItems.map((item, index) => (
              <Card key={index} className="bg-card/50 border-border/50 backdrop-blur">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Closing text and CTA */}
        <div className="mt-16 text-center space-y-8">
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
        </div>
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
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Veja o que Deus já fez…
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <p className="text-2xl md:text-3xl font-semibold text-center mt-12 text-foreground">
          E isso é só o começo.
        </p>
        
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-lg font-medium"
          >
            <span>👉</span>
            <span>Quero viver isso também</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

// How It Started Section
function HowItStartedSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Uma visão que nasceu em Deus
            </h2>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              A Conferência Imersos nasceu no coração de Letícia Oliveira e Mikeias Radis, 
              após uma experiência profunda com Deus. Nesse momento, o Espírito Santo revelou 
              a ela uma visão completa — tema, estrutura e propósito.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Com temor e obediência, Letícia compartilhou essa direção com outros irmãos 
              que carregam o mesmo amor pelo Reino. E ali houve confirmação: Deus testificou 
              em cada coração, e a visão passou a ser construída em unidade.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Com mais de 10 anos dedicados à liderança de adolescentes, Letícia, ao lado de 
              seu marido e da equipe, já vinha sendo preparada para esse chamado. Sua atuação 
              também se estende à coordenação da UNADCAR (União de Adolescentes do Campo de Carapina), 
              fortalecendo o despertar espiritual desta geração.
            </p>
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              Hoje, a Conferência Imersos é sustentada por uma diretoria alinhada à missão de 
              formar uma geração teen e jovem mergulhada em Deus, vivendo o chamado com ousadia 
              e rendição total.
            </p>
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
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
        </div>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <member.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                <h4 className="text-lg font-semibold text-foreground">{member.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card border-border/50">
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

          <Card className="bg-card border-border/50">
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

          <Card className="bg-card border-border/50">
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
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button 
            asChild
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
          >
            <a href="#">IMERSOS 2026</a>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8"
          >
            <a href="#">QUERO ME INSCREVER</a>
          </Button>
        </div>
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
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Mission - Large Card */}
          <Card className="lg:row-span-2 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
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

          {/* Vision */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
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

          {/* Values Header */}
          <Card className="lg:col-span-2 bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Valores</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {values.map((value, index) => (
            <Card key={index} className="bg-card border-border/50 hover:border-primary/30 transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Mais de <span className="text-primary">2.000</span> pessoas já disseram sim
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Entre 2024 e 2025, mais de 2.000 participantes fizeram história junto com a gente. 
          Vidas foram impactadas. Chamados foram despertados. Histórias foram transformadas.
        </p>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
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
          <div className="text-2xl font-bold">
            <span className="text-foreground">IMERSOS</span>
            <span className="text-primary">2026</span>
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
