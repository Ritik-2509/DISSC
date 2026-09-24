"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  X,
  Filter,
  Trash2,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

interface ContactItem {
  id: string | number;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  content?: string;
  status: "new" | "read" | "replied" | "archived";
  created_at?: string;
}

export default function AdminContactInquiries() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

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

  const handleToggleStatus = async (contact: ContactItem, newStatus: ContactItem["status"]) => {
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

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Subject", "Message", "Status", "Date"];
    const rows = filteredContacts.map((c) => [
      c.id,
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.subject || "").replace(/"/g, '""')}"`,
      `"${(c.content || "").replace(/"/g, '""')}"`,
      c.status || "new",
      c.created_at || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DISCC_Inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    if (statusFilter !== "all") return c.status === statusFilter;
    return true;
  });

  const totalPages = Math.ceil(filteredContacts.length / pageSize) || 1;
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Inquiries & Callback Requests
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Review incoming assessment requests, phone callbacks, and volunteer applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="rounded-full gap-2 text-xs"
          >
            <Download className="w-4 h-4" />
            Export CSV ({filteredContacts.length})
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-text absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender name, email, phone or topic..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-foreground text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "new", "read", "replied"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-primary text-white capitalize">
                {selectedContact.status || "new"}
              </span>
              <h2 className="text-2xl font-bold font-heading text-foreground mt-2">
                {selectedContact.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-text mt-1">
                {selectedContact.phone && (
                  <span className="flex items-center gap-1 text-primary">
                    <Phone className="w-3.5 h-3.5" />
                    {selectedContact.phone}
                  </span>
                )}
                {selectedContact.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {selectedContact.email}
                  </span>
                )}
                {selectedContact.created_at && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(selectedContact.created_at).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="p-2 rounded-full hover:bg-muted text-muted-text cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text">
              Subject / Topic
            </h4>
            <p className="font-bold text-base text-foreground">
              {selectedContact.subject || "General Consultation Request"}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text">
              Message / Inquired Details
            </h4>
            <div className="p-4 rounded-2xl bg-[#FFFAF2] border border-border text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedContact.content || "No extended message text provided."}
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-text">Mark Status:</span>
              <button
                onClick={() => handleToggleStatus(selectedContact, "new")}
                className="px-3 py-1 rounded-lg text-xs font-bold border border-border hover:bg-muted cursor-pointer"
              >
                New
              </button>
              <button
                onClick={() => handleToggleStatus(selectedContact, "read")}
                className="px-3 py-1 rounded-lg text-xs font-bold border border-border hover:bg-muted cursor-pointer"
              >
                Read
              </button>
              <button
                onClick={() => handleToggleStatus(selectedContact, "replied")}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-[#E6F6EE] text-[#0F8B8D] border border-[#0F8B8D]/30 cursor-pointer"
              >
                Replied
              </button>
            </div>

            <Button
              onClick={() => handleDeleteContact(selectedContact.id)}
              variant="destructive"
              size="sm"
              className="gap-1 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Inquiry
            </Button>
          </div>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="rounded-3xl bg-white border border-border/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FFFAF2] border-b border-border/70 text-muted-text font-bold uppercase text-[10.5px]">
                <th className="p-4">Sender Name</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Subject / Topic</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {paginatedContacts.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedContact(c)}
                  className="hover:bg-[#FFFAF2]/50 transition-colors cursor-pointer"
                >
                  <td className="p-4 font-bold text-foreground">
                    {c.name || "Anonymous"}
                    {c.email && (
                      <span className="block text-[11px] text-muted-text font-normal">
                        {c.email}
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-semibold text-primary">
                    {c.phone || "-"}
                  </td>
                  <td className="p-4 text-muted-text max-w-sm truncate">
                    {c.subject || c.content || "Assessment Booking"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold capitalize ${
                        c.status === "replied"
                          ? "bg-[#E6F6EE] text-[#0F8B8D]"
                          : c.status === "read"
                          ? "bg-muted text-foreground"
                          : "bg-[#F5A524]/20 text-[#1E2A3A]"
                      }`}
                    >
                      {c.status || "new"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContact(c);
                      }}
                      className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-text">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredContacts.length)} of{" "}
            {filteredContacts.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
