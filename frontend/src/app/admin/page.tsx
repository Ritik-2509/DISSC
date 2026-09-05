export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of the DISCC platform.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder cards for metrics */}
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Total Blogs</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Gallery Images</h3>
          <p className="text-3xl font-bold">48</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Unread Contacts</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>
    </div>
  );
}
