import { useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import { GrClose } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import "react-responsive-modal/styles.css";
import { MdOutlineDownloadDone, MdRemoveCircle } from "react-icons/md";
import { useRecoilState } from "recoil";
import { groupTypeAtom } from "@/recoils";
import { v4 as uuidv4 } from "uuid";

function CategoryModal({ open, setOpen, dataSource }) {
  const containerRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const [groupType, setGroupType] = useRecoilState(groupTypeAtom);

  // find category data
  let copyGroupType = [...groupType];
  const category = copyGroupType?.find((e) => e?.id === dataSource?.id);
  const indexCategory = copyGroupType?.findIndex((e) => e?.id === category?.id);

  const onCloseModal = () => {
    setOpen(false);
    setInputValue("");
  };

  const handleInput = (e) => {
    setInputValue(e?.target?.value);
  };

  const handleAddButton = () => {
    const newValue = inputValue?.trim();
    if (newValue === "") {
      return;
    }

    const newSubType = {
      id: uuidv4(),
      title: newValue,
      items: [],
    };

    const newSubArr = [...category?.sub, newSubType];
    copyGroupType?.splice(indexCategory, 1, { ...category, sub: newSubArr });

    setGroupType([...copyGroupType]);
    setInputValue("");
  };

  const handleRemove = (groupTypeData) => {
    if (!confirm(`Do you want to delete ${groupTypeData?.title}?`)) {
      return;
    }

    const newSubArr = category?.sub?.filter((e) => e?.id !== groupTypeData?.id);
    copyGroupType?.splice(indexCategory, 1, { ...category, sub: newSubArr });

    setGroupType([...copyGroupType]);
    setInputValue("");
  };

  return (
    <>
      <div className="w-full" ref={containerRef} />
      <AnimatePresence>
        {open && (
          <Modal
            open={true}
            onClose={onCloseModal}
            center
            classNames={{
              modal: "bg-transparent shadow-none overflow-visible",
              closeButton: "hidden",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -200, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -80, scale: 0.9 }}
              transition={{
                duration: 0.3,
                type: "spring",
              }}
              className="w-full md:w-[600px] bg-white p-6 rounded-lg shadow-xl"
            >
              <div className="flex justify-between">
                <h1 className="font-bold">{category?.title}</h1>
                <button
                  onClick={onCloseModal}
                  role="button"
                  tabIndex={0}
                  className="hover:opacity-60"
                >
                  <GrClose />
                </button>
              </div>
              <div className="py-4">
                <ul>
                  {category?.sub?.map((load) => (
                    <li key={load?.id} className="p-2 flex gap-3">
                      <div>- {load?.title}</div>
                      <button onClick={() => handleRemove(load)}>
                        <MdRemoveCircle className="text-red-600" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-4 w-full">
                  <input
                    className="border p-1 border-gray-700 rounded-md w-full"
                    value={inputValue}
                    placeholder="Enter new..."
                    onChange={handleInput}
                  />

                  <button
                    onClick={handleAddButton}
                    role="button"
                    tabIndex={0}
                    className="hover:opacity-60 p-2 bg-green-600 text-white rounded-lg"
                  >
                    <MdOutlineDownloadDone size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default CategoryModal;
