import { Building2, GraduationCap, HeartHandshake, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const PARTNERS = [
  { type: 'Government', name: 'Ministry of Foreign Affairs (Kemenlu)', desc: 'ConsularTech integration enabling diaspora visa fast-tracking through our Green Channel. Official diplomatic backing for heritage return programs.', icon: Building2 },
  { type: 'University', name: 'ASEAN University Network', desc: 'Our Cultural Ambassador recruitment pipeline. Students from UMDP, USTP, SUT, and Phenikaa University serve as peer companions.', icon: GraduationCap },
  { type: 'NGO', name: 'ASEAN-COCI Cultural Fund', desc: 'Regional funding for cultural preservation. Supporting our mission to document and protect endangered heritage practices.', icon: HeartHandshake },
  { type: 'Community', name: 'Local Eco-Tourism Cooperatives', desc: 'Grassroots partners in Palembang, Mindanao, Hanoi, and Isan. Homestay networks and artisan workshops run by local families.', icon: Users },
];

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Ecosystem</p>
          <h1 className="mt-2 text-4xl font-bold text-warm-950 md:text-5xl font-display">Who makes this possible</h1>
          <p className="mt-4 max-w-2xl text-lg text-warm-600">
            HOME-COMING operates through a network of governments, universities, NGOs,
            and grassroots communities. No venture capital. No shareholders. Just institutions
            and communities aligned around heritage preservation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map(({ type, name, desc, icon: Icon }) => (
            <Card key={name} className="group border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-6 w-6" />
                </div>
                <Badge variant="primary" className="mb-3 w-fit">{type}</Badge>
                <h3 className="text-base font-semibold text-warm-950">{name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-warm-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
