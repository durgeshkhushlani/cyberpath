import React from 'react';
import { ExternalLink } from 'lucide-react';

const newsSources = [
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/", description: "Investigative journalism on cybercrime and security breaches." },
  { name: "Bleeping Computer", url: "https://www.bleepingcomputer.com/", description: "Breaking cybersecurity news, malware reports, and vulnerability disclosures." },
  { name: "The Hacker News", url: "https://thehackernews.com/", description: "Daily cybersecurity news covering threats, breaches, and tools." },
  { name: "Dark Reading", url: "https://www.darkreading.com/", description: "Enterprise security strategy, threat intelligence, and analysis." },
  { name: "CISA Advisories", url: "https://www.cisa.gov/news-events/cybersecurity-advisories", description: "Official US government cybersecurity advisories and alerts." },
  { name: "SANS Internet Stormcast", url: "https://isc.sans.edu/", description: "Daily threat analysis and vulnerability reports from SANS ISC." },
  { name: "Recorded Future Blog", url: "https://www.recordedfuture.com/blog", description: "Threat intelligence research and APT actor analysis." },
  { name: "Google Project Zero", url: "https://googleprojectzero.blogspot.com/", description: "Zero-day vulnerability research from Google's elite security team." },
  { name: "Naked Security", url: "https://nakedsecurity.sophos.com/", description: "Plain-English security news and advice." },
  { name: "SecurityWeek", url: "https://www.securityweek.com/", description: "Enterprise cybersecurity news and analysis." },
];

const News = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-text-primary">Industry News</h1>
        <p className="text-text-secondary mt-1">Curated links to top cybersecurity intelligence sources.</p>
        <div className="bg-surface-2 border border-border rounded-md p-3 mt-4 text-sm text-text-muted inline-block">
          * CyberPath links to trusted industry sources. No content is stored or reproduced.
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsSources.map((source, i) => (
           <div key={i} className="card flex flex-col h-full hover:border-accent transition-colors">
             <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center justify-between">
               {source.name}
             </h3>
             <p className="text-sm text-text-secondary mb-6 flex-1">
               {source.description}
             </p>
             <a 
               href={source.url} 
               target="_blank" 
               rel="noreferrer"
               className="btn-outline w-full text-center flex items-center justify-center group"
             >
               Visit Source 
               <ExternalLink className="w-4 h-4 ml-2 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] transition-transform" />
             </a>
           </div>
        ))}
      </div>
    </div>
  );
};

export default News;
