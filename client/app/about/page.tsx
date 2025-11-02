import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passionate developer transitioning into the world of cybersecurity,
            sharing my journey and knowledge along the way.
          </p>
        </div>

        {/* My Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">My Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Where I Started</h3>
                <p className="text-gray-600 leading-relaxed">
                  I began my career as a Fullstack Developer, building web applications 
                  and working with various technologies. Over time, I became increasingly 
                  interested in the security aspects of the applications I was developing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">The Turning Point</h3>
                <p className="text-gray-600 leading-relaxed">
                  After encountering several security vulnerabilities in production systems 
                  and witnessing the impact of security breaches, I realized that security 
                  wasn't just an afterthought—it was fundamental to building robust applications.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">My Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Now, I'm dedicated to learning and sharing knowledge about application security, 
                helping other developers understand the importance of security-first development 
                practices, and documenting my transition into the cybersecurity field.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Expertise */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Development</h3>
                <p className="text-gray-600 text-sm">
                  Fullstack development experience with modern frameworks, 
                  databases, and cloud platforms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-gray-600 text-sm">
                  Application security, vulnerability assessment, 
                  secure coding practices, and security testing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning</h3>
                <p className="text-gray-600 text-sm">
                  Continuous learning mindset, staying updated with 
                  latest security trends and best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Focus */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">What I'm Learning Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Penetration Testing</h4>
                  <p className="text-gray-600 text-sm">
                    Learning ethical hacking techniques and tools to identify vulnerabilities in applications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Security Architecture</h4>
                  <p className="text-gray-600 text-sm">
                    Understanding how to design secure systems from the ground up.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Incident Response</h4>
                  <p className="text-gray-600 text-sm">
                    Learning how to detect, respond to, and recover from security incidents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Threat Modeling</h4>
                  <p className="text-gray-600 text-sm">
                    Identifying potential threats and designing countermeasures proactively.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications & Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Current Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">CompTIA Security+ (In Progress)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Network+ (In Progress)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Linux (In Progress)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">CCNA (In Progress)</span>
              </div>
              {/* <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">AWS Certified Developer</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Microsoft Certified: Azure Developer</span>
              </div> */}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Future Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">OSCP (Offensive Security Certified Professional)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">CISSP (Certified Information Systems Security Professional)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Lead Security Engineer Role</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Me on This Journey
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're a developer looking to learn more about security, 
              someone transitioning into cybersecurity, or just interested in the field, 
              I'd love to connect and share knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Read My Blog
                </Button>
              </Link>
              {/* <Link href="/auth/signin">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6">
                  Access Admin Panel
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
