import { createClient } from '@supabase/supabase-js';
import CompanyPageClient from './CompanyPageClient';

// Create a server-side Supabase client for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Generate static pages for all companies at build time
export async function generateStaticParams() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: companies } = await supabase
    .from('Hamburg Targets')
    .select('id');

  return (companies || []).map((company) => ({
    id: company.id.toString(),
  }));
}

export default function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <CompanyPageClient params={params} />;
}
