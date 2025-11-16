import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { email, password, phone, firstname, lastname, role } =
    await request.json();

  // Get the current authenticated user
  const supabase = await createServerClient();
  const {
    data: { user: currentUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !currentUser) {
    return NextResponse.json(
      { error: "Unauthorized. You must be logged in to create users." },
      { status: 401 }
    );
  }

  // Ensure environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not set." },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Use the admin client to create a new user
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    phone: phone,
    email_confirm: true,
    user_metadata: {
      first_name: firstname,
      last_name: lastname,
      role: role,
      created_by: currentUser.id, // Add the current user's ID
    },
  });

  if (error) {
    console.error("Supabase admin error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Insert user into the database table
  const { error: dbError } = await supabaseAdmin
    .from("users")
    .insert({
      user_id: data.user.id,
      email: email,
      phone: phone,
      first_name: firstname,
      last_name: lastname,
      role: role,
      created_by: currentUser.id,
      modified_by: currentUser.id,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    });

  if (dbError) {
    console.error("Database insert error:", dbError);
    // User was created in auth but not in database
    // You might want to delete the auth user here
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    return NextResponse.json(
      { error: `Failed to create user profile: ${dbError.message}` },
      { status: 500 }
    );
  }

  console.log("✅ User created successfully!");
  console.log("Created by:", currentUser.id);
  console.log("New user ID:", data.user.id);
  console.log("User metadata:", data.user.user_metadata);

  return NextResponse.json({
    message: "User created successfully.",
    user: data.user,
  });
}
