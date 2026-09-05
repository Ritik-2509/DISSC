"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = "/api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/contact`)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching contacts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Entries</h1>
        <p className="text-muted-foreground">Messages from the contact form.</p>
      </div>

      <div className="border rounded-xl bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No contact entries found.</div>
        ) : (
          <div className="divide-y">
            {contacts.map((contact: any) => (
              <div key={contact.id} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.email} {contact.phone && `| ${contact.phone}`}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(contact.createdAt).toLocaleString()}</p>
                  </div>
                  {!contact.isRead && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">New</span>
                  )}
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  {contact.message}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Mark as Read</Button>
                  <Button variant="secondary" size="sm">Reply via Email</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
