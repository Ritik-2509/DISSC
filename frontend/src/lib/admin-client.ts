/**
 * Unified Client API for DISCC Admin Panel
 * Handles fast local persistence + live Firestore synchronization
 */

export async function fetchAdminCollection<T = any>(collection: string): Promise<T[]> {
  try {
    const res = await fetch(`/api/${collection}`);
    if (!res.ok) throw new Error(`Failed to load ${collection}`);
    return await res.json();
  } catch (err) {
    console.warn(`Falling back to direct json for ${collection}:`, err);
    try {
      const res = await fetch(`/firestore_export/${collection}.json`);
      return await res.json();
    } catch {
      return [];
    }
  }
}

export async function saveAdminItem<T = any>(collection: string, item: any): Promise<{ success: boolean; data?: T }> {
  try {
    const method = item.id ? "PUT" : "POST";
    const res = await fetch(`/api/${collection}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Save failed");
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error(`Error saving to ${collection}:`, err);
    return { success: false };
  }
}

export async function deleteAdminItem(collection: string, id: string | number): Promise<boolean> {
  try {
    const res = await fetch(`/api/${collection}?id=${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error(`Error deleting from ${collection}:`, err);
    return false;
  }
}
