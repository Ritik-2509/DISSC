"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = "/api";

export default function AdminFAQs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/faqs`).then(r => r.json()).then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage FAQs</h1>
          <p className="text-muted-foreground">Frequently asked questions.</p>
        </div>
        <Button>Add FAQ</Button>
      </div>
      <div className="border rounded-xl bg-card">
        {loading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> : 
         items.length === 0 ? <div className="p-8 text-center text-muted-foreground">No FAQs found.</div> : 
         <div className="divide-y">{items.map((t: any) => (
           <div key={t.id} className="p-4 flex justify-between"><span className="font-medium">{t.question || t.title}</span><Button variant="outline" size="sm">Edit</Button></div>
         ))}</div>}
      </div>
    </div>
  );
}
