"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Plus, Search, Edit, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  useEffect(() => {
    fetch("/firestore_export/faqs.json")
      .then((r) => r.json())
      .then((d) => setFaqs(d))
      .catch(() => {
        setFaqs([
          { id: 1, question: "What is DISCC and when was it established?", answer: "DISCC was established in Varanasi in 1991 by Dr. C. Tulsi Das to care for children with intellectual disabilities.", status: "published" },
          { id: 2, question: "Is my donation tax exempt under 80G in India?", answer: "Yes, all donations are eligible for tax exemption under Section 80G and Section 12A of the Income Tax Act.", status: "published" },
          { id: 3, question: "Can foreign donors contribute under FCRA?", answer: "Yes, DISCC holds an FCRA registration number granted by the Government of India for international contributions.", status: "published" }
        ]);
      });
  }, []);

  const filteredFaqs = faqs.filter((f) =>
    (f.question && f.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (f.answer && f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    let target: any;
    if (editingFaq.id && faqs.some((f) => f.id === editingFaq.id)) {
      target = { ...editingFaq, updated_at: new Date().toISOString() };
      setFaqs(faqs.map((f) => (f.id === editingFaq.id ? target : f)));
    } else {
      target = { ...editingFaq, id: Date.now(), created_at: new Date().toISOString() };
      setFaqs([target, ...faqs]);
    }
    setEditingFaq(null);
    await saveAdminItem("faqs", target);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this FAQ item?")) {
      setFaqs(faqs.filter((f) => f.id !== id));
      await deleteAdminItem("faqs", id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Public Information</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
              {faqs.length} FAQs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage inquiries related to disability care, admissions, donations, and NGO registrations.
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingFaq({
              id: null,
              question: "",
              answer: "",
              status: "published",
            })
          }
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </Button>
      </div>

      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs by question or answer keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-xs overflow-hidden divide-y divide-border/60">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-muted/20 transition-colors">
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-base text-secondary">{faq.question}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingFaq({ ...faq })}
                className="h-8 px-3 rounded-lg text-xs font-bold border-border text-secondary hover:border-primary"
              >
                <Edit className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(faq.id)}
                className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-black text-xl text-secondary">
                {editingFaq.id ? "Edit FAQ" : "New FAQ"}
              </h3>
              <button onClick={() => setEditingFaq(null)} className="text-muted-foreground hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Question</label>
                <input
                  type="text"
                  value={editingFaq.question || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Answer</label>
                <textarea
                  value={editingFaq.answer || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={5}
                  required
                  className="w-full p-3 rounded-xl border border-border text-xs leading-relaxed outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditingFaq(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                  Save FAQ
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
