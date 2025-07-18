import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Radio,
  ChevronRight,
  DiscIcon as Discord,
  Github,
  MapPin,
  Clock,
  AlertTriangle,
  Award,
  Globe,
  Check,
} from "lucide-react"
import { ServerStats } from "@/components/server-stats"
import { DispatcherCard } from "@/components/dispatcher-card"
import { ApplicationForm } from "@/components/application-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/massreality-logo.png"
              alt="MassReality FivePD Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <span className="text-xl font-bold">MassReality</span>
              <span className="text-sm text-muted-foreground block leading-none">FivePD</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#departments" className="text-sm font-medium hover:text-primary transition-colors">
              Departments
            </Link>
            <Link href="#Cad" className="text-sm font-medium hover:text-primary transition-colors">
              Cad
            </Link>
            <Link href="#apply" className="text-sm font-medium hover:text-primary transition-colors">
              Apply
            </Link>
            <Link href="#rules" className="text-sm font-medium hover:text-primary transition-colors">
              Rules
            </Link>
            <Link href="#staff" className="text-sm font-medium hover:text-primary transition-colors">
              Staff
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://discord.gg/massreality" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent hover:bg-primary/10">
                <Discord className="mr-2 h-4 w-4" />
                Join Discord
              </Button>
            </Link>
            <Link href="https://cfx.re/join/3z5ljb" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90 hover:shadow-primary-glow">
                Connect Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="home" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
          <div
            className="h-[600px] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-background.jpeg')" }}
          />
          <div className="container absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
            <Image
              src="/images/massreality-logo.png"
              alt="MassReality FivePD Logo"
              width={120}
              height={120}
              className="mb-6 drop-shadow-lg"
            />
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 animate-pulse">
              <Radio className="mr-1 h-3 w-3" />
              Live Server
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
              MassReality <span className="text-primary">FivePD</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground mb-8 text-lg drop-shadow">
              🏙️ MassReality FivePD offers an immense hyper-realistic 1:1 Massachusetts state roleplay experience. We
              take our roleplay experience seriously to clone real life events. Additionally, at MassReality you can
              easily dive into our hard working departments to keep the state running smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://cfx.re/join/3z5ljb" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary-glow">
                  <MapPin className="mr-2 h-4 w-4" />
                  Connect To Server
                </Button>
              </Link>
              <Link href="https://discord.gg/massreality" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background/80 backdrop-blur hover:shadow-primary-glow"
                >
                  <Discord className="mr-2 h-4 w-4" />
                  Join Our Discord
                </Button>
              </Link>
            </div>
            <ServerStats />
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-primary/20 hover:shadow-primary-glow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Professional Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Realistic law enforcement protocols and procedures based on real Massachusetts departments
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center border-primary/20 hover:shadow-primary-glow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">1:1 Massachusetts Server</h3>
                  <p className="text-sm text-muted-foreground">
                    Accurate recreation of Massachusetts deptartment vehicles, clothing, and more!
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center border-primary/20 hover:shadow-primary-glow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Strict</h3>
                  <p className="text-sm text-muted-foreground">
                    We are strict when it comes to providing good realistic, immersive, and unforgettable experiences
                    for our members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="departments" className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Departments We Offer</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Join one of our professional departments and serve the Massachusetts community with pride and dedication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/images/boston-police-banner.jpeg')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Boston Police Department</h3>
                <p className="text-muted-foreground">
                  Serve and protect the city of Boston with community policing, patrol units, and detective work.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url('https://cdn.discordapp.com/attachments/1395643075656683602/1395654589298118746/307638056_100377106178911_1660811692378937819_n.png?ex=687b3c20&is=6879eaa0&hm=0a4a1aaa70d0f24c1abf10fab43df5e2f32eeee1be3f867b4716668429ddca30&')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Boston Fire Department</h3>
                <p className="text-muted-foreground">
                  Respond to fires, rescue operations, and emergency situations to keep Boston safe.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/images/mass-state-police-banner.jpeg')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Massachusetts State Police</h3>
                <p className="text-muted-foreground">
                  Elite state troopers handling highway patrol, investigations, and specialized operations across
                  Massachusetts.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url('https://cdn.discordapp.com/attachments/1395643075656683602/1395655749358719027/SCSD_Website_Banner.png?ex=687b3d34&is=6879ebb4&hm=57ff238f5273db85c0f64f1f5f88b40e6ebc652fd92ed1ef64fda3f02456d409&')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Suffolk County Sheriff's Department</h3>
                <p className="text-muted-foreground">
                  County law enforcement handling court security, prisoner transport, and correctional operations.
                </p>
              </CardContent>
            </Card>

            <DispatcherCard />

            <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url('https://cdn.discordapp.com/attachments/1395643075656683602/1395655865113116712/Screenshot_2025-07-17_170318.png?ex=687b3d50&is=6879ebd0&hm=0141680baf1a603fbc9b965351a13b9ebd830a8e2c81b37998de3ea3f32b54d3&')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Civilian Operations</h3>
                <p className="text-muted-foreground">
                  Experience civilian life in Massachusetts with various career paths, businesses, and community
                  interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="Cad" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cad Information</h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">Our Imperial Cad Information</p>
            </div>

            <Tabs defaultValue="getting-started" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="dept-info">Department Info</TabsTrigger>
                <TabsTrigger value="create-civilian">Creating a Civilian</TabsTrigger>
              </TabsList>
              <TabsContent value="getting-started" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Getting Started with Imperial CAD</h3>
                    <p className="text-muted-foreground mb-6">
                      Follow these simple steps to set up your Imperial CAD account and join the MassReality community.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Step 1: Create or Login to Imperial CAD</p>
                          <p className="text-sm text-muted-foreground">
                            Visit{" "}
                            <Link
                              href="https://imperialcad.app/auth"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              imperialcad.app/auth
                            </Link>{" "}
                            to create a new account or log in to your existing one.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Step 2: Join the MassReality Community</p>
                          <p className="text-sm text-muted-foreground">
                            After logging in, click the blue circle icon with a door (Join Community). Enter the
                            Community Key: <span className="font-bold text-foreground">Massreality</span>
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Step 3: Explore the CAD System</p>
                          <p className="text-sm text-muted-foreground">
                            Once joined, you can explore the various features of Imperial CAD, including
                            department-specific tools and civilian operations.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Step 4: Get Whitelisted (if applicable)</p>
                          <p className="text-sm text-muted-foreground">
                            For whitelisted departments, ensure you have completed the application process on our
                            website and received approval to access full department features within CAD.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/images/massreality-logo.png"
                      alt="MassReality FivePD Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="dept-info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Department Information in CAD</h3>
                    <p className="text-muted-foreground mb-6">
                      Learn how to access and utilize department-specific features and information within the Imperial
                      CAD system.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Accessing Department Panels</p>
                          <p className="text-sm text-muted-foreground">
                            Navigate to your assigned department panel to view active calls, unit statuses, and dispatch
                            tools.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Understanding Unit Statuses</p>
                          <p className="text-sm text-muted-foreground">
                            Familiarize yourself with different unit statuses (e.g., 10-8, 10-42) and how to update
                            them.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Incident Reporting</p>
                          <p className="text-sm text-muted-foreground">
                            Learn how to create and submit detailed incident reports for calls you respond to.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Dispatching Procedures</p>
                          <p className="text-sm text-muted-foreground">
                            For dispatchers, understand the protocols for assigning units, creating calls, and managing
                            the radio.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/images/massreality-logo.png"
                      alt="MassReality FivePD Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="create-civilian" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Creating Your Civilian Character</h3>
                    <p className="text-muted-foreground mb-6">
                      As a civilian, you can create and manage your character's identity, vehicles, and properties
                      within Imperial CAD.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Registering a Civilian Profile</p>
                          <p className="text-sm text-muted-foreground">
                            Create your civilian identity with a name, date of birth, and other relevant details.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Managing Vehicles</p>
                          <p className="text-sm text-muted-foreground">
                            Add and manage your personal vehicles, including license plates and vehicle types.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Registering Properties</p>
                          <p className="text-sm text-muted-foreground">
                            Register properties you own or reside in within the game world.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Reporting Incidents</p>
                          <p className="text-sm text-muted-foreground">
                            As a civilian, you can also report incidents or emergencies through the CAD system.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/images/massreality-logo.png"
                      alt="MassReality FivePD Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="apply" className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join A Whitelisted Department </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Ready to serve and protect? Apply to join one of our whitelisted departments and make a difference
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 hover:shadow-primary-glow">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Application Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Age Requirement</p>
                          <p className="text-sm text-muted-foreground">Must be 15+ years old</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Clean Record</p>
                          <p className="text-sm text-muted-foreground">
                            No major disciplinary actions on our/other server(s)
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Radio className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Communication</p>
                          <p className="text-sm text-muted-foreground">Working microphone and Discord required</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Activity</p>
                          <p className="text-sm text-muted-foreground">Commit and be active </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Application Process</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Submit Application</p>
                          <p className="text-sm text-muted-foreground">Fill out our detailed application form</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Background Check</p>
                          <p className="text-sm text-muted-foreground">Do a community background check </p>
                          <p className="text-sm text-muted-foreground">ㅤㅤㅤㅤㅤㅤㅤ</p>
                          <p className="text-sm text-muted-foreground">If you passed you will be messaged </p>
                          <p className="text-sm text-muted-foreground">If you pass, the following will occur: </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Interview</p>
                          <p className="text-sm text-muted-foreground">Voice interview with department leadership</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Training</p>
                          <p className="text-sm text-muted-foreground">Complete academy training program</p>
                          <p className="text-sm text-muted-foreground">ㅤㅤㅤㅤㅤㅤㅤ</p>
                          <p className="text-sm text-muted-foreground">**TEMP MSG: EA DOES NOT DO STEP 3 & 4** </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <ApplicationForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="rules" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Server Rules & Policies</h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Professional standards and conduct expected from all members of our community
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#">
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-[#a1c1f2] hover:text-primary-foreground shadow-lg hover:shadow-[#a1c1f2]/50 transition-all duration-300 hover:shadow-primary-glow"
                >
                  Server Rules (Game)
                </Button>
              </Link>
              <Link href="https://discord.gg/massreality" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-[#a1c1f2] hover:text-primary-foreground shadow-lg hover:shadow-[#a1c1f2]/50 transition-all duration-300 hover:shadow-primary-glow"
                >
                  Discord Rules
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="staff" className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">Meet the dedicated team behind MassReality</p>
          </div>

          <div className="space-y-12">
            {/* Head Administrator */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Head Administrator</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/attachments/1395643075656683602/1395643097869717556/IMG_4019.png?ex=687b316c&is=6879dfec&hm=07d78c18dc99c825e286fa5d3cf8d17fcf064ed8b8e51a087c69ef588223cd12&" // Replace with your Head Administrator's image URL
                      alt="Head Administrator"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Frnoahh</h3>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Administrators */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Administrators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/guilds/1123746756459507846/users/990056042081689621/avatars/f84e27f896f0333d1e875fbf08189981.webp?size=128"
                      alt="Administrator"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Moon</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/435494780735193090/40f318eccc38d090a0d3f7887960861d.webp?size=100"
                      alt="Administrator"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Woofy</h3>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Community Staff */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Community Staff</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/521324624479387648/787e522cc39f4611147b67e85c50e4e6.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Jokerzzz</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/1236830529857519619/7558e51bc94dc2c5be714da2c38ac4ee.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Andrew Green</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/1035351494708441180/46728b44570bf40b76e303cc9cae331c.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Western</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/1275980537218994320/436b09c693b494d6f3ed63bcf1fb0798.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Fadeqx</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/812365198274854953/2e9607803f3653dd0f0fddf19f6f2a28.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Warfilms</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/1185413887848370289/bef99ce107b4db53f035363bb8bb1b80.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">ItsJustSlams</h3>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow w-48 border-2 border-[#a1c1f2] hover:shadow-[#a1c1f2]/50 hover:shadow-primary-glow">
                  <CardContent className="p-4 text-center flex flex-col items-center">
                    <Image
                      src="https://cdn.discordapp.com/avatars/745333370216775803/fa27c27343f4d89099e2f6757a7b932e.webp?size=100"
                      alt="Community Staff"
                      width={150}
                      height={150}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="font-bold text-foreground">Megatron</h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary/5">
          <div className="container text-center">
            <Image
              src="/images/massreality-logo.png"
              alt="MassReality FivePD Logo"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">Ready to Serve Massachusetts?</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
              Join our professional law enforcement community and make a difference in the Bay State. Connect to our
              server or join our Discord to get started today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="https://cfx.re/join/3z5ljb" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary-glow">
                  <MapPin className="mr-2 h-4 w-4" /> {/* Re-adding the MapPin icon */}
                  Connect to Server
                </Button>
              </Link>
              <Link href="https://discord.gg/massreality" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary/10 bg-transparent hover:shadow-primary-glow"
                >
                  <Discord className="mr-2 h-4 w-4" />
                  Join Our Discord
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Departments</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Mass State Police
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Boston PD
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sheriff's Office
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Fire & EMS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Communications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li></li>
                <li></li>
                <li></li>
                <li>
                  <Link
                    href="https://discord.com/channels/1123746756459507846/1394174170538967050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Server Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.com/channels/1123746756459507846/1393085334987870249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://discord.com/channels/1123746756459507846/1393085987818569728"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Discord Server
                  </Link>
                </li>
                <li>
                  <Link href="#apply" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Application Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.com/channels/1123746756459507846/1393087492797763604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Report Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.com/channels/1123746756459507846/1395647188121681971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Commendations
                  </Link>
                </li>
                <li></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Staff
                  </Link>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image src="/images/massreality-logo.png" alt="MassReality FivePD Logo" width={32} height={32} />
              <div>
                <span className="font-bold">MassReality</span>
                <span className="text-sm text-muted-foreground block leading-none">FivePD</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://discord.gg/massreality"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>
              © 2025 MassReality. All rights reserved. Not affiliated with Massachusetts State Police or any real law
              enforcement agency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
