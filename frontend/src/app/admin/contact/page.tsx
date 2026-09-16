"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Reply,
  Filter,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

export default function AdminContactInquiries() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    fetch("/firestore_export/contacts.json")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.reverse()); // most recent first
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleToggleStatus = async (contact: any) => {
    const newStatus = contact.status === "read" ? "unread" : "read";
    const updated = { ...contact, status: newStatus };
    setContacts(contacts.map((c) => (c.id === contact.id ? updated : c)));
    if (selectedContact?.id === contact.id) setSelectedContact(updated);
    await saveAdminItem("contacts", updated);
  };

  const handleDeleteContact = async (contactId: string | number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setContacts(contacts.filter((c) => c.id !== contactId));
    if (selectedContact?.id === contactId) setSelectedContact(null);
    await deleteAdminItem("contacts", contactId);
  };

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && String(c.phone).includes(q)) ||
      (c.subject && c.subject.toLowerCase().includes(q)) ||
      (c.content && c.content.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (statusFilter === "unread") return c.status === "unread";
    if (statusFilter === "read") return c.status === "read";
    return true;
  });

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Communications Inbox</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
              {contacts.length} Total Messages
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Contact Inquiries & Submissions
          </h1>
          <p className="text-xs text-muted-foreground">
            Messages received from the DISCC public portal, donations inquiry desk, and helpline.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender name, email, phone or content..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:inline" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 px-4 rounded-xl border border-border text-xs font-semibold text-secondary outline-none focus:border-primary bg-card w-full sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-card rounded-3xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-secondary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Sender Details</th>
                <th className="py-4 px-6">Phone / Location</th>
                <th className="py-4 px-6">Subject / Message</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <p className="font-bold text-sm text-secondary">{contact.name || "Anonymous"}</p>
                    <p className="text-primary text-[11px] font-medium">{contact.email || "No email"}</p>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <p className="font-semibold text-secondary">{contact.phone || "None"}</p>
                    <p className="text-[11px] line-clamp-1">{contact.address || "Varanasi"}</p>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <p className="font-semibold text-secondary truncate">{contact.subject || "General Inquiry"}</p>
                    <p className="text-muted-foreground text-[11px] line-clamp-1">
                      {contact.content || "No message content"}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground whitespace-nowrap">
                    {contact.created_at ? contact.created_at.split("T")[0].split(" ")[0] : "Recent"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContact(contact);
                      }}
                      className="rounded-lg text-xs font-bold border-border text-secondary hover:border-primary"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Page {currentPage} of {Math.max(1, totalPages)} ({filteredContacts.length} entries)
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 px-3 rounded-lg text-xs"
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 px-3 rounded-lg text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display font-black text-xl text-secondary">
                  {selectedContact.name || "Inquiry Details"}
                </h3>
                <p className="text-xs text-muted-foreground">Received on {selectedContact.created_at || "Recent"}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-muted-foreground hover:text-secondary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/40 border border-border/80">
                <div className="space-y-1">
                  <span className="text-muted-foreground block">Email Address:</span>
                  <p className="font-bold text-primary text-sm">{selectedContact.email || "None"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">Phone Number:</span>
                  <p className="font-bold text-secondary text-sm">{selectedContact.phone || "None"}</p>
                </div>
              </div>

              {selectedContact.address && (
                <div className="space-y-1">
                  <span className="text-muted-foreground block font-semibold">Address / Location:</span>
                  <p className="text-secondary">{selectedContact.address}</p>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-muted-foreground block font-semibold">Subject:</span>
                <p className="font-bold text-sm text-secondary">{selectedContact.subject || "Inquiry"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground block font-semibold">Message Content:</span>
                <div className="p-4 rounded-2xl bg-muted/20 border border-border text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {selectedContact.content || "No message body provided."}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedContact(null)}
                  className="rounded-xl text-xs"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleToggleStatus(selectedContact)}
                  className="rounded-xl text-xs border-border text-secondary"
                >
                  {selectedContact.status === "read" ? "Mark Unread" : "Mark as Read"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteContact(selectedContact.id)}
                  className="rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </Button>
              </div>

              {selectedContact.email && (
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject || "DISCC India Inquiry")}`}
                >
                  <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Reply className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
