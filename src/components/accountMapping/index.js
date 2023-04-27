"use client"

function AccountMapping() {
  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white">
      {/* <div className="overflow-x-auto mt-4 p-2 border border-gray-500 rounded-xl">
        <div className="">
          <table className="rounded-lg">
            <tbody>
              {parsedData?.data?.map((r, i) => (
                <tr key={i} className="border">
                  {parsedData?.cols
                    //   ?.filter((e) => Boolean(r[e.key]))
                    ?.map((c) => (
                      <td
                        key={c.key}
                        className="text-sm px-2 border break-keep"
                      >
                        {r[c.key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </section>
  );
}

export default AccountMapping;
