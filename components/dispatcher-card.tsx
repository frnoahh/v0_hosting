"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DispatcherCard() {
  return (
    <Card className="overflow-hidden border-primary/20 hover:border-primary transition-colors">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.discordapp.com/attachments/1395643075656683602/1395654882500808736/BRCC_Website_Banner.png?ex=687b3c66&is=6879eae6&hm=7a97292dc47c80d9fec4b5293e4b53eda2453345fb1843450c5ceca221ac50f4&')" }}
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Boston Regional Communications Center</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Open
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          Dispatch emergency services and coordinate responses as the vital communication hub for all departments.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Whitelisted Department</span>
          </div>
          {/* Changed link to point to the #apply section on the current page */}
          <Link href="#apply">
            <Button size="sm" variant="secondary">
              Apply Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
