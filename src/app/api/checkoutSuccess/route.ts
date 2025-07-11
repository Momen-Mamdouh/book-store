

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function POST(req: Request) {
  
  const supabase = await createClient();
  const { user_id, books_ids } = await req.json(); 
  
  if(!user_id){
    return NextResponse.json({ success: false, error:"User ID is Required"}, {status:400})
  }

  const bookIds = books_ids?.map((b: { book_id: string }) => b.book_id) ?? [];

  // ^^Fetch for cartItems
  let cartQuery = supabase.from("cart_items").select("*").eq("user_id", user_id);
  if (bookIds.length > 0) {
    cartQuery = cartQuery.in("book_id", bookIds); 
  }

  const { data: cartItems, error: fetchErr } = await cartQuery;
  if (fetchErr || cartItems.length===0) return NextResponse.json({ success: false, error: fetchErr?.message }, { status: 500 });

  const total = cartItems.reduce((acc, item) => acc + item.book_price * item.book_count, 0);
  
  if (cartItems.length === 0 || total === 0) {
    return NextResponse.json({ success: false, error: "No items to process or total is zero." }, { status: 400 });
  }

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert([{ user_id, total_price: total }])
    .select()
    .single();

  if (orderErr) return NextResponse.json({ success: false, error: orderErr.message }, { status: 500 });

  // ^^Insert order_items
  const orderItems = cartItems.map(item => ({
    id:item.id,
    order_id: order.id,
    user_id,
    book_id: item.book_id,
    book_title: item.book_title,
    book_price: item.book_price,
    book_count: item.book_count,
  }));

  const { error: insertErr } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (insertErr) return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });

  // ^^Clear selected Items from cart
  let deleteQuery = supabase.from("cart_items").delete().eq("user_id", user_id);
  if (bookIds.length > 0) {
    deleteQuery = deleteQuery.in("book_id", bookIds);
  }
  const { error: deleteErr } = await deleteQuery;
  if (deleteErr) {
    return NextResponse.json({ success: false, error: deleteErr.message }, { status: 500 });
  }

  const { error:allOrdersError} = await supabase.from("order_items").select("*");
  if(allOrdersError){
    return NextResponse.json({ success: false, error:allOrdersError?.message}, {status:500})
  }
return NextResponse.json({ success: true, error:null, order_id: order.id }, { status: 200 });
}
